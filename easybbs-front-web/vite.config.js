import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  lintOnSave: false,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server:{
    // 开启热更新
    hmr:true,
    // 更改默认端口
    port:3004,
    proxy:{
      "/api":{
        target:"http://localhost:7070",
        changeOrigin:true,
        pathRewrite:{
          "^api":"/api"
        }
      }
    }
  }

  
})
