import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/navindu-portfolio/',
  plugins: [react()],
})