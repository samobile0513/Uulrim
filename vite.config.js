import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // ✅ 이 줄이 중요!
  plugins: [react()],
})
