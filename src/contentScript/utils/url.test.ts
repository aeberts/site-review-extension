import { clearUrlParams } from "./url"

describe("clearUrlParams", () => {
    it("should remove query parameters from the URL", () => {
        const urlWithParams =
            "http://example.com/page?param1=value1&param2=value2"
        const expectedUrlWithoutParams = "http://example.com/page"
        expect(clearUrlParams(urlWithParams)).toBe(expectedUrlWithoutParams)
    })

    it("should return the original URL if it doesn't contain query parameters", () => {
        const urlWithoutParams = "http://example.com/page"
        expect(clearUrlParams(urlWithoutParams)).toBe(urlWithoutParams)
    })

    it("should return the original URL if the input is not a string", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invalidUrl: any = null
        expect(clearUrlParams(invalidUrl)).toBe(invalidUrl)
    })

    it("should handle URLs with hash fragments", () => {
        const urlWithHash = "http://example.com/page#section"
        expect(clearUrlParams(urlWithHash)).toBe(urlWithHash)
    })

    // Add more test cases to cover additional scenarios if needed
})
