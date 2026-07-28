import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Kidus-Portfolio.github.io/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        course: resolve(__dirname, 'course/signal-data-analysis/index.html'),
      },
    },
  },
})
