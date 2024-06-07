/* eslint-disable @typescript-eslint/no-explicit-any */
import { JestChrome } from "jest-chrome/types/jest-chrome"
import { updateCacheRating } from "./updateCacheRating"
import { MessageRate } from "../../../types/message.types"

describe("updateCacheRating", () => {
    const sendResponseMock = jest.fn()
    const jestChrome = chrome as any as JestChrome

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should store the rating in cache and return status 200", async () => {
        const data: MessageRate = {
            url: "http://example.com",
            rate: 5,
        }

        jestChrome.storage.local.set.mockImplementation(() => Promise.resolve())

        await updateCacheRating(sendResponseMock, data)

        expect(chrome.storage.local.set).toHaveBeenCalledWith({
            "http://example.com": 5,
        })
        expect(sendResponseMock).toHaveBeenCalledWith({ statusCode: 200 })
    })

    it("should handle error during storage and return status 500", async () => {
        const data: MessageRate = { url: "http://example.com", rate: 5 }

        jestChrome.storage.local.set.mockImplementation(() => {
            throw new Error("Storage error")
        })

        await updateCacheRating(sendResponseMock, data)

        expect(sendResponseMock).toHaveBeenCalledWith({ statusCode: 500 })
    })

    it("should return status 400 if URL is missing", async () => {
        const data: Omit<MessageRate, "url"> = { rate: 5 }

        await updateCacheRating(sendResponseMock, data as any) // Force error by ignoring type

        expect(sendResponseMock).toHaveBeenCalledWith({ statusCode: 400 })
    })
})
