// createShadowRoot.test.ts
import { render } from "@testing-library/react"
import { createShadowRoot } from "./shadow"

const cssURL = "https://example.com/styles.css"
describe("createShadowRoot", () => {
    it("should create a shadow root and append the React app root node", () => {
        const { container } = render(<div id="app-root" />)
        const root = container.querySelector("#app-root") as HTMLElement

        const shadowEl = createShadowRoot(root, cssURL)

        expect(root.shadowRoot).not.toBeNull()
        const appRootInShadow = shadowEl.shadowRoot?.querySelector("#app-root")
        expect(appRootInShadow).not.toBeNull()
        const styleSheet = shadowEl.shadowRoot?.querySelector(
            'link[rel="stylesheet"][href="https://example.com/styles.css"]',
        )
        expect(styleSheet).not.toBeNull()
    })
})
