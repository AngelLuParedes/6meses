import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // './' funciona en GitHub Pages sin importar el nombre del repo
  base: "./",
  plugins: [react(), tailwindcss()],
});
