//playwright.config.ts
import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
    // Look for test files in the "tests" directory, relative to this configuration file.
    testDir: "acceptance-tests",
    use: {
        baseURL: "http://google.com/",
        browserName: "chromium",
        headless: false,
    },
}
export default config
