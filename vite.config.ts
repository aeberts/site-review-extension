import { defineConfig } from "vite"
import { resolve } from "path"
import react from "@vitejs/plugin-react"
import { crx } from "@crxjs/vite-plugin"
import css from "rollup-plugin-css-only"
import manifest from "./public/manifest.json"

const root = resolve(__dirname, "src")
const assetsDir = resolve(root, "assets")
const typesDir = resolve(root, "types")

// https://vitejs.dev/config/
export default defineConfig({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins: [react(), crx({ manifest }), css({ output: "bundle.css" }) as any],
    resolve: {
        alias: {
            "@src": root,
            "@assets": assetsDir,
            "@types": typesDir,
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            sourcemap: true,
        },
    },
})
