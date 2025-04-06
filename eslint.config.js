import html from "@html-eslint/eslint-plugin"
import htmlParser from "@html-eslint/parser"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"
import prettierPlugin from "eslint-plugin-prettier"
import reactRefreshPlugin from "eslint-plugin-react-refresh"

export default [
    // Base config for JS/TS files
    {
        ignores: ["dist/**", "node_modules/**"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                browser: true,
                jest: true,
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "jsx-a11y": jsxA11yPlugin,
            prettier: prettierPlugin,
            "react-refresh": reactRefreshPlugin,
        },
        rules: {
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            "prettier/prettier": "error",
            semi: ["error", "never"],
        },
    },

    // HTML files config
    {
        files: ["**/*.html"],
        languageOptions: {
            parser: htmlParser,
        },
        plugins: {
            "@html-eslint": html,
        },
        rules: {
            ...html.configs.recommended.rules,
            // Disable prettier for HTML files to avoid parsing conflicts
            "prettier/prettier": "off",
        },
    },
]
