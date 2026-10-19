import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative paths make the build work on GitHub Pages project sites.
export default defineConfig({
  plugins: [react()],
  base: './',
})
