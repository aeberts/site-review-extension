import { defineConfig } from "vite"
import { resolve } from "path"
import react from "@vitejs/plugin-react"
import { crx } from "@crxjs/vite-plugin"
import css from "rollup-plugin-css-only"
import manifest from "./public/manifest.json"

const root = resolve(__dirname, "src")
const assetsDir = resolve(__dirname, "public")

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        css({ output: "bundle.css" }) as any,
        crx({ manifest, contentScripts: { injectCss: true } }),
    ],
    resolve: {
        alias: {
            "@src": root,
            "@assets": assetsDir,
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            sourcemap: true,
        },
    },
    build: {
        rollupOptions: {
            input: {
                popup: resolve(assetsDir, 'popup.html'),
                // add other entry points here
            },
        },
    },
})
