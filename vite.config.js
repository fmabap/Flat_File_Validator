import { defineConfig } from "vite";

// vite.config.js
export default defineConfig({
    // config options
    base:"./",
    build: {
        outDir: "./docs",
        cssCodeSplit: false,
    },
    
	
  });