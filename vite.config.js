import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ReactPlayer from 'react-player'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),ReactPlayer,tailwindcss(),],
})
