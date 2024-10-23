import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	  server: {
    proxy: {
      '/auth': 'http://144.22.63.67:8080',
      '/api': {
		target: 'http://144.22.63.67:8080',
		changeOrigin: true,
	  }
    },
  },
  plugins: [react()],
})
