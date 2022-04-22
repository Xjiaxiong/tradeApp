import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const devServerTarget= 'http://192.168.0.103:9011/'
const serverTarget = 'http://czw.menhey.cn'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {        
          if(id.includes('node_modules')) {
            if(id.toString().split('node_modules/')[1].split('/')[0].includes('element3')) {
              return 'element3'
            } else {
              return 'vendor'
            }
          }
        }
      }
    }
  },
  css:{
    preprocessorOptions: {
      less: {
        charset: false
      }
    }
  },
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
