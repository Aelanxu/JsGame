import { defineConfig } from 'vite'
import {resolve} from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  base: './', // 打包路径
  publicDir: 'public',
  server: {
    port: 3000, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true // 允许跨域
  },
  build: {
    sourcemap:true,
    rollupOptions: {
      external: (id) => /webconfig.js/.test(id)    
    }
  }
})
