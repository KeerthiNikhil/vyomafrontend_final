import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/admin": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/vendor": {
        target: "http://localhost:5174",
        changeOrigin: true,
      },
    },
  },
})