import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom', // <-- ¡Esta es la línea que faltaba o estaba incorrecta!
    setupFiles: './src/setupTests.js', // Asegúrate de que esta línea también esté.
  },
})
