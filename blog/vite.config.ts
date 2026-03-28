import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// @ts-ignore
const __dirname = import.meta.dirname

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': __dirname + '/src'
    }
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true
  },
  base: '/'
})
