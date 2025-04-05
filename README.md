# Chrome Extension Template
This is a starting point for developing v3 Chrome extensions using Vite, React, and TypeScript.
The default behavior is to record the number of visits to a site but this is just to illustrate the basic structure of the extension.

Please note that this extension template is based on the [Site Review Extension](https://github.com/EduardoAC/site-review-extension/tree/master) but Eduardo AC.
Many thanks to Eduardo AC for the original work and the great [blog post](https://medium.com/@byeduardoac/chrome-extensions-effective-unit-testing-with-jest-chrome-bc3edf3c171a) about developing and testing v3 Chrome extensions.

### Features:

1. **Popup:** A popup window that shows a list of the sites the user has visited and the number of visits to each site.
2. **Chrome Storage:** Visits are stored locally in Chrome storage cache.
3. **Testing Strategies:** Templates for unit tests, integration tests, and end-to-end tests as explained by Eduardo AC [here](https://medium.com/@byeduardoac/chrome-extensions-effective-unit-testing-with-jest-chrome-bc3edf3c171a).

### Get Started:

1. **Clone Repository:** Clone the Site Reviewer repository from GitHub.
2. **Install Dependencies:** Run `bun install` to install the required dependencies.
3. **Build Extension:** Run `bun run build` to build the extension.
4. **Test Extension:** Run `bun run test` to execute tests and ensure the extension functions correctly.
5. **Load Unpacked:** Open Chrome browser and go to `chrome://extensions/`.
6. **Enable Developer Mode:** Toggle the Developer mode switch on the top right corner.
7. **Load Extension:** Click on "Load unpacked" and select the build directory of the extension (default location is `dist`)
8. **Ready to Use:** Once installed, the extension is ready to use, and the icon will appear in the browser toolbar.

### Usage:

TBD

### Testing Strategies:

1. **Unit Tests:** Tests individual components and functions in isolation to ensure they work as expected.
2. **Integration Tests:** Tests how different components interact with each other within the extension.
3. **End-to-End Tests:** Tests the extension's functionality from the user's perspective, simulating real-world scenarios.

### License:

The Site Reviewer extension is licensed under the [MIT License](https://opensource.org/licenses/MIT). You are free to modify and distribute the extension according to the terms of the license.
