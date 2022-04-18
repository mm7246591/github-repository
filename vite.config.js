import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src",
                import.meta.url)),
            assets: "@/assets",
            common: "@/common",
            components: "@/components",
            network: "@/network",
            views: "@/views",
            plugins: "@/plugins",
        },
    },
    css: {
        postcss: {
            plugins: [{
                postcssPlugin: "internal:charset-removal",
                AtRule: {
                    charset: (atRule) => {
                        if (atRule.name === "charset") {
                            atRule.remove();
                        }
                    },
                },
            }, ],
        },
    },
});