import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/2022-09-Orleans-CDA-Projet-Frontend-Template/", // TODO: use the right repo name
  plugins: [react()],
});
