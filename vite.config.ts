import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { dataToEsm } from "rollup-pluginutils";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      plugins: [{
        name: "raw-svg-file-loader",
        transform (_: string, filepath: string) {
          if (filepath.includes("node_modules")) {
            return null;
          }
          if (filepath.endsWith(".svg")) {
            return {
              code: dataToEsm(fs.readFileSync(filepath).toString())
            };
          }
        }
      }]
    }
  }
});
