/* eslint-disable @typescript-eslint/no-explicit-any */
import { JestChrome } from "jest-chrome/types/jest-chrome"
import { getRateFromCache } from "./getRateFromCache"

describe("getRateFromCache", () => {
    const sendResponseMock = jest.fn()
    const jestChrome = chrome as any as JestChrome

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should retrieve the rating from cache and return status 200 with data", async () => {
        const data = { url: "http://example.com" }

        jestChrome.storage.local.get.mockImplementation(() =>
            Promise.resolve({ "http://example.com": 5 }),
        )

        await getRateFromCache(sendResponseMock, data)

        expect(chrome.storage.local.get).toHaveBeenCalledWith([
            "http://example.com",
        ])
        expect(sendResponseMock).toHaveBeenCalledWith({
            statusCode: 200,
            data: 5,
        })
    })

    it("should handle error during retrieval and return status 500", async () => {
        const data = { url: "http://example.com" }

        jestChrome.storage.local.get.mockImplementation(() => {
            throw new Error("Retrieval error")
        })

        await getRateFromCache(sendResponseMock, data)

        expect(sendResponseMock).toHaveBeenCalledWith({ statusCode: 500 })
    })

    it("should return status 500 if URL is missing", async () => {
        const data = {}

        await getRateFromCache(sendResponseMock, data as any) // Force error by ignoring type

        expect(sendResponseMock).toHaveBeenCalledWith({ statusCode: 500 })
    })
})
