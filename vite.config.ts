import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/badger-app/',
  plugins: [tailwindcss(), react()],
  server: {
    host: true, // 👈 ВАЖНО: позволяет подключаться по IP
  },
});
