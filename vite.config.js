import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

const plugins = [vue(), vueJsx(), tailwindcss(), compression()]
if (process.env.NODE_ENV === 'development') {
  import('vite-plugin-vue-devtools').then((module) => {
    plugins.push(module.default())
  })
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: 'esbuild',
  },
})
