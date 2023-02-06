import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    // preview:{
    //     // proxy: {
    //     //     '/api': {
    //     //         target: 'http://nginx:80/api', // replace with the correct URL or IP address
    //     //         changeOrigin: true,
    //     //     },
    //     // },

    //     // proxy: {
    //     //     '/api/data': {
    //     //       target: 'https://localhost:80/api/data',
    //     //       changeOrigin: true,
    //     //       secure: false,      
    //     //       ws: true,
    //     //       configure: (proxy, _options) => {
    //     //         proxy.on('error', (err, _req, _res) => {
    //     //           console.log('proxy error', err);
    //     //         });
    //     //         proxy.on('proxyReq', (proxyReq, req, _res) => {
    //     //           console.log('Sending Request to the Target:', req.method, req.url);
    //     //         });
    //     //         proxy.on('proxyRes', (proxyRes, req, _res) => {
    //     //           console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
    //     //         });
    //     //       },
    //     //     }
    //     //   }
        
    // // },
    //     proxy: {
    //         "/api/data": {
    //             target: "https://localhost:80/api/data",
    //             changeOrigin: true,
    //             secure: false,
    //             rewrite: (path) => path.replace(/^\/api/, ""),
    //         },
    //     },
    // },
    plugins: [react()],
    
    server: {
        proxy: {
            "/api/": {
                target: "https://proxy:80/api/",
                changeOrigin: true,
                secure: false,
                // rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
        watch: {
            usePolling: true,
        },
        host: true, // needed for the Docker Container port mapping to work
        strictPort: true,
        port: 5173, // you can replace this port with any port
    },
});