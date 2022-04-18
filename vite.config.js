import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
    undefined,
    plugins: [vue()],
    server: {
        undefined,
        host: "0.0 .0 .0",
        port: 3000,
        // 是否开启 https
        https: false,
    },
    base: "./",
});