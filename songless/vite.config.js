import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
allowedHosts: [
  '.trycloudflare.com',
  '.ngrok-free.app',
  '.ngrok.io',
  '.serveo.net',
  '.serveousercontent.com',
  '.loca.lt',
  'localhost',
],
    hmr: {
      clientPort: 443,
      protocol: 'wss',
    },
  },
})