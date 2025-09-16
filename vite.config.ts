import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  optimizeDeps: {
    include: ["@qubitronlabs/crypto-wallet"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  plugins: [react(), tailwindcss()],
  server: { port: 3000 },
});