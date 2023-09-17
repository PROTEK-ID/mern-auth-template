import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../server/dist/public",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash][extname]",
        chunkFileNames: "assets/[name].[hash][extname]",
      },
    },
  },
});
