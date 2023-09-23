import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    base: process.env.VITE_BASENAME,
    build: {
      outDir: "../server/build/generated/public",
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
};
