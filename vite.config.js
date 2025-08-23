import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // Keep path as-is because Express mounts routes at /api/*
        // If your backend uses a different base path, adjust here
      }
    }
  }
})
