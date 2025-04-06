import { type JestConfigWithTsJest } from "ts-jest"
// jest.config.ts

const config: JestConfigWithTsJest = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    roots: ["<rootDir>/src"],
    automock: false,
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
    ],
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: {
                    jsx: "react-jsx", // Explicitly tell ts-jest to use the modern JSX transform
                },
            },
        ],
        // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        "\\.css$": "jest-css-modules",
    },
}

export default config
