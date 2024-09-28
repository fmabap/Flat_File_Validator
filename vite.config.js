import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// vite.config.js
export default defineConfig({
    // config options
    plugins: [
        viteSingleFile()],
    base: "./",
    build: {
        outDir: "./docs",
        publicDir: "./public"
    }
});