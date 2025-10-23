// src/pages/Login.test.jsx
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest'; // Ya no necesitamos afterEach
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';

// Mock de 'react-router-dom' (se queda igual)
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLoginComponent = () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<div>Página de Inicio</div>} />
        <Route path="/register" element={<div>Página de Registro</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Página de Login', () => {
  // Limpiamos mocks y localStorage.
  // ¡Quitamos los fake timers de aquí!
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  it('debería renderizar el formulario correctamente', () => {
    renderLoginComponent();
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    const registerLink = screen.getByRole('link', { name: /regístrate/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  // 👇 --- CAMBIO EN ESTE TEST ---
  it('debería mostrar errores de validación del cliente', async () => {
    // Usamos userEvent.setup() normal, sin { delay: null }
    // Este test usará "relojes reales", lo cual está bien porque es rápido.
    const user = userEvent.setup();
    renderLoginComponent();
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    await user.click(submitButton);
    expect(await screen.findByText(/el email es obligatorio/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/correo electrónico/i), 'email-invalido');
    await user.click(submitButton);
    expect(await screen.findByText(/email invalido/i)).toBeInTheDocument();

    await user.clear(screen.getByLabelText(/correo electrónico/i));
    await user.type(screen.getByLabelText(/correo electrónico/i), 'test@test.com');
    await user.type(screen.getByLabelText(/contraseña/i), '123');
    await user.click(submitButton);
    expect(await screen.findByText(/la contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  // 👇 --- CAMBIOS EN ESTE TEST ---
  it('debería mostrar estado de "cargando" y luego error de credenciales', async () => {
    // 1. Activamos los timers falsos SÓLO para este test
    vi.useFakeTimers();
    // 2. Usamos setup con delay: null
    const user = userEvent.setup({ delay: null });
    renderLoginComponent();

    await user.type(screen.getByLabelText(/correo electrónico/i), 'user@incorrecto.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'password123');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    const loadingButton = screen.getByRole('button', { name: /ingresando.../i });
    expect(loadingButton).toBeInTheDocument();
    expect(loadingButton).toBeDisabled();

    // 3. Avanzamos el reloj
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(await screen.findByText(/correo electrónico o contraseña incorrectos/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeEnabled();
    expect(mockNavigate).not.toHaveBeenCalled();

    // 4. Restauramos los timers reales al final del test
    vi.useRealTimers();
  });

  // 👇 --- CAMBIOS EN ESTE TEST ---
  it('debería iniciar sesión y navegar al inicio con credenciales correctas', async () => {
    // 1. Activamos los timers falsos SÓLO para este test
    vi.useFakeTimers();
    // 2. Usamos setup con delay: null
    const user = userEvent.setup({ delay: null });

    const mockUser = { email: 'user@pasteleria.com', password: 'password123' };
    localStorage.setItem('users', JSON.stringify([mockUser]));
    renderLoginComponent();

    await user.type(screen.getByLabelText(/correo electrónico/i), 'user@pasteleria.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'password123');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(screen.getByRole('button', { name: /ingresando.../i })).toBeDisabled();

    // 3. Avanzamos el reloj
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    expect(screen.queryByText(/correo electrónico o contraseña incorrectos/i)).not.toBeInTheDocument();
    expect(localStorage.getItem('loggedInUser')).toEqual(JSON.stringify(mockUser));
    
    // 4. Restauramos los timers reales al final del test
    vi.useRealTimers();
  });
});