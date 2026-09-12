import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * AutoFlowX Vite Configuration
 * Configures React SWC compiler, development server, and path aliases for MVC architecture.
 */
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/controllers": path.resolve(__dirname, "./src/controllers"),
      "@/models": path.resolve(__dirname, "./src/models"),
      "@/views": path.resolve(__dirname, "./src/views"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
    },
  },
}));
