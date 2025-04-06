/* eslint-disable @typescript-eslint/no-explicit-any */
import { JestChrome } from "jest-chrome/types/jest-chrome"
import { ratingMessageHandler } from "./ratingMessageHandler"
import { Message, MessageRate } from "../../../types/message.types"

describe("ratingMessageHandler", () => {
    const sendResponseMock = jest.fn()
    const jestChrome = chrome as any as JestChrome

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should delegate "get" message to getRateFromCache', async () => {
        const message: Message<MessageRate> = {
            type: "rating",
            subType: "get",
            data: { url: "http://example.com" },
        }

        jestChrome.storage.local.get.mockImplementation(() =>
            Promise.resolve({ "http://example.com": 5 }),
        )

        await ratingMessageHandler(message, sendResponseMock)

        expect(chrome.storage.local.get).toHaveBeenCalledWith([
            "http://example.com",
        ])

        expect(sendResponseMock).toHaveBeenCalledWith({
            statusCode: 200,
            data: 5,
        })
    })

    it('should delegate "update" message to updateCacheRating', async () => {
        const message: Message<MessageRate> = {
            type: "rating",
            subType: "update",
            data: { url: "http://example.com", rate: 5 },
        }

        jestChrome.storage.local.set.mockImplementation(() => Promise.resolve())

        await ratingMessageHandler(message, sendResponseMock)

        expect(chrome.storage.local.set).toHaveBeenCalledWith({
            "http://example.com": 5,
        })
        expect(sendResponseMock).toHaveBeenCalledWith({ statusCode: 200 })
    })

    it("should return status 405 for unsupported subType", async () => {
        const message: Message<MessageRate> = {
            type: "rating",
            subType: "unknown" as any,
            data: { url: "http://example.com" },
        }

        await ratingMessageHandler(message, sendResponseMock)

        expect(sendResponseMock).toHaveBeenCalledWith({ statusCode: 405 })
    })
})
