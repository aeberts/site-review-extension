import { type JestConfigWithTsJest } from "ts-jest"
// jest.config.ts

const config: JestConfigWithTsJest = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    roots: ["<rootDir>/src"],
    automock: false,
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        "\\.css$": "jest-css-modules",
    },
}

export default config
