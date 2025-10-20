import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ✅ Para importar rutas absolutas: import X from "@/components/X"
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ✅ Para desarrollo local con backend en otro puerto (por ejemplo: 5000)
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // ✅ Build optimizado
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
