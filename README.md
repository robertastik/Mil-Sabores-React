# 🍰 Mil Sabores - Frontend React

Aplicación web frontend para **Mil Sabores**, una pastelería artesanal (ficticia) ubicada en Santiago de Chile. Esta aplicación permite a los clientes explorar productos, realizar pedidos y participar en la comunidad a través de un blog.

## 📋 Descripción

Mil Sabores es una plataforma de e-commerce para una pastelería artesanal que ofrece:
- Catálogo de productos con carruseles interactivos
- Sistema de carrito de compras con descuentos personalizados
- Autenticación de usuarios con roles (USER/ADMIN)
- Blog comunitario para compartir experiencias
- **Panel de administración** para gestión completa
- Diseño responsive con temática de café y tonos cálidos

## 🚀 Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| React | 19.1.1 | Biblioteca de UI |
| React Router DOM | 7.9.4 | Enrutamiento SPA |
| Tailwind CSS | 4.1.14 | Framework de estilos |
| Axios | 1.13.2 | Cliente HTTP |
| Vite (rolldown-vite) | 7.1.14 | Bundler y dev server |
| Vitest | 4.0.1 | Framework de testing |

## 📁 Estructura del Proyecto

```
src/
├── assets/              # Recursos estáticos (fuentes, imágenes)
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx       # Barra de navegación (usuarios)
│   ├── AdminNavbar.jsx  # Barra de navegación (admin)
│   ├── Footer.jsx       # Pie de página
│   └── ProtectedRoute.jsx # Rutas protegidas
├── config/
│   └── axiosConfig.js   # Configuración de Axios con JWT
├── context/
│   ├── AuthContext.jsx  # Estado de autenticación y roles
│   └── CartContext.jsx  # Estado del carrito
├── pages/               # Páginas de usuario
│   ├── Home.jsx         # Página principal
│   ├── About.jsx        # Sobre nosotros
│   ├── Productos.jsx    # Catálogo de productos
│   ├── ProductDetail.jsx # Detalle del producto
│   ├── Blog.jsx         # Blog comunitario
│   ├── Login.jsx        # Inicio de sesión
│   ├── Registro.jsx     # Registro de usuario
│   ├── Profile.jsx      # Perfil del usuario
│   ├── Checkout.jsx     # Proceso de compra
│   └── admin/           # Páginas de administración
│       ├── AdminHome.jsx      # Dashboard
│       ├── AdminProductos.jsx # CRUD productos
│       ├── AdminUsuarios.jsx  # Gestión usuarios
│       └── AdminPosts.jsx     # Moderación posts
├── services/            # Servicios de API
│   ├── AuthService.js   # Autenticación
│   ├── ProductoService.js # Productos
│   ├── PostService.js   # Posts del blog
│   └── AdminService.js  # Operaciones de admin
├── styles/
│   └── index.css        # Estilos globales y tema
├── App.jsx              # Componente raíz con routing dual
└── main.jsx             # Punto de entrada
```

## 🎨 Paleta de Colores

| Color | Variable | Hex |
|-------|----------|-----|
| Café Claro | `--color-cafe-claro` | #fff5e1 |
| Café Blanco | `--color-cafe-blanco` | #fff9ed |
| Café Negro | `--color-cafe-negro` | #1d1300 |
| Café Oscuro | `--color-cafe-oscuro` | #5d4037 |
| Rosa | `--color-rosa` | #ffc0cb |

## 🔤 Tipografías

- **Título**: Pacifico (cursive)
- **Subtítulo**: PlayfairDisplay (serif)
- **Texto**: Inter (sans-serif)

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd Mil-Sabores-React
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (opcional)
   - La API por defecto apunta a `http://localhost:8080/api`
   - Modificar `src/config/axiosConfig.js` si es necesario

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Vista previa de la build de producción |
| `npm run lint` | Ejecuta ESLint para análisis de código |
| `npm run test` | Ejecuta los tests con Vitest |
| `npm run test:ui` | Ejecuta tests con interfaz visual |
| `npm run test:coverage` | Ejecuta tests con reporte de cobertura |

## ✨ Funcionalidades

### 🛒 Carrito de Compras (Usuarios)
- Agregar/eliminar productos
- Actualizar cantidades
- Descuentos automáticos:
  - 10% para clientes mayores de 65 años
  - Cupones de descuento

### 👤 Autenticación y Roles
- Registro de nuevos usuarios
- Inicio de sesión con JWT
- **Rol USER**: Acceso a tienda, carrito, blog
- **Rol ADMIN**: Acceso exclusivo al panel de administración
- Toggle de visibilidad de contraseña

### 👑 Panel de Administración
Interfaz completamente separada para administradores:

| Sección | Funcionalidad |
|---------|---------------|
| **Dashboard** | Estadísticas generales, accesos rápidos |
| **Productos** | Crear, editar, eliminar productos |
| **Usuarios** | Ver y eliminar usuarios |
| **Posts** | Moderar publicaciones del blog |

### 📝 Blog Comunitario
- Ver publicaciones de otros usuarios
- Crear nuevas publicaciones (usuarios autenticados)
- Eliminar publicaciones propias
- Admin puede eliminar cualquier post

### 🎠 Interfaz
- Carruseles de productos interactivos
- Diseño responsive
- Navegación fluida con React Router
- Layouts separados para USER y ADMIN

## 🔧 Requisitos del Backend

Esta aplicación requiere un backend de Spring Boot ejecutándose en `http://localhost:8080` con los siguientes endpoints:

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login (devuelve token + role) |
| POST | `/api/auth/register` | Registro |
| GET | `/api/auth/profile` | Perfil del usuario |
| PUT | `/api/auth/profile` | Actualizar perfil |

### Productos
| Método | Endpoint | Acceso |
|--------|----------|--------|
| GET | `/api/productos` | Público |
| GET | `/api/productos/{id}` | Público |
| POST | `/api/productos` | ADMIN |
| PUT | `/api/productos/{id}` | ADMIN |
| DELETE | `/api/productos/{id}` | ADMIN |

### Usuarios (Solo ADMIN)
| Método | Endpoint |
|--------|----------|
| GET | `/api/usuarios` |
| DELETE | `/api/usuarios/{id}` |

### Posts
| Método | Endpoint | Acceso |
|--------|----------|--------|
| GET | `/api/posts` | Público |
| POST | `/api/posts` | USER |
| DELETE | `/api/posts/{id}` | Autor o ADMIN |

## 🔐 Sistema de Roles

```
┌─────────────────────────────────────────────────────────┐
│                    FLUJO DE AUTENTICACIÓN               │
└─────────────────────────────────────────────────────────┘

  Login exitoso
       │
       ▼
  Backend devuelve: { token, email, role }
       │
       ▼
  ┌─────────────────────────────────────┐
  │  role === "ADMIN"?                  │
  └─────────────────────────────────────┘
       │                    │
      SÍ                   NO
       │                    │
       ▼                    ▼
  ┌──────────────┐    ┌──────────────┐
  │ AdminLayout  │    │ UserLayout   │
  │ - Dashboard  │    │ - Home       │
  │ - Productos  │    │ - Productos  │
  │ - Usuarios   │    │ - Carrito    │
  │ - Posts      │    │ - Blog       │
  └──────────────┘    └──────────────┘
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar con interfaz visual
npm run test:ui

# Generar reporte de cobertura
npm run test:coverage
```

## 📄 Licencia

Proyecto para Instituto DUOC UC.

---

Desarrollado con ❤️ para Mil Sabores
