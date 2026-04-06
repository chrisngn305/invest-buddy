import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    dedupe: ['vue', 'element-plus', '@vue/runtime-core']
  }
})
