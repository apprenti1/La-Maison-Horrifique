import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mode } from './src/lib/utils'

// https://vite.dev/config/
export default defineConfig({
  base: mode === 'production' ? '/lamaisonhorifique/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

