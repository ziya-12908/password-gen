import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path for the app (use '/' for Render's root deployment)
  base: '/',
  
  // Server configuration for local development
  server: {
    host: '::', // Allow IPv6 binding (same as 0.0.0.0 for IPv4)
    port: 8080, // Custom port for dev server
  },
  
  // Plugins for React and component tagging (only in development)
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  
  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias '@' to 'src/' directory
    },
  },
  
  // Build configuration for production
  build: {
    outDir: 'dist', // Explicitly set output directory to 'dist'
    sourcemap: mode === 'development', // Generate sourcemaps only in development
    rollupOptions: {
      // Ensure external dependencies are handled correctly
      external: [],
    },
  },
}));