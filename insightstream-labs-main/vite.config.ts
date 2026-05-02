import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/kaushal-s-portfolio/', // Set base path for GitHub Pages
  root: __dirname, // Explicitly set the root directory
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Explicitly set the entry point
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
