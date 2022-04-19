import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    base: "./",
    plugins: [vue()],
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: "js/[name]-[hash].js",
                entryFileNames: "js/[name]-[hash].js",
                assetFileNames: "[ext]/[name]-[hash].[ext]",
            },
        },
    },
});