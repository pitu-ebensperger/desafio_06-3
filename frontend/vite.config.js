import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({                   
  plugins: [react()],                         
  server: {                                     
    port: 517,                                 
    strictPort: true,                         
    // If later you want to avoid hardcoding http://localhost:3000 in code,
    // you can proxy API calls like this:
    // proxy: { '/api': 'http://localhost:3000' }
  }, 
  proxy: { '/api': 'http://localhost:3000'},                                         
})                                            