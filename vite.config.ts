import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Dynamic port configuration with fallbacks
  const vitePort = parseInt(process.env.VITE_PORT || process.env.PORT || '3001');
  const functionsPort = parseInt(process.env.FUNCTIONS_PORT || '8888');
  const devPort = parseInt(process.env.DEV_PORT || '3000');
  
  return {
    server: {
      host: "::",
      port: vitePort,
      strictPort: false, // Allow Vite to find alternative port if specified port is busy
      proxy: {
        // Proxy /api requests to backend - use dynamic functions port
        '/api': {
          target: `http://localhost:${functionsPort}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/.netlify/functions')
        },
        // Proxy /.netlify/functions requests to backend - use dynamic functions port  
        '/.netlify/functions': {
          target: `http://localhost:${functionsPort}`,
          changeOrigin: true
        }
      }
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
