import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, '/src/lib.js'),
      name: 'Todo',
      fileName: 'todo'
    },
    modulePreload: false
  },
  define: { 'process.env.NODE_ENV': '"production"' }
})
