/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageRate } from "../../types/message.types"
import { messageHandler } from "./eventHandler"
import { ratingMessageHandler } from "./onMessageHandlers/ratingMessageHandler"

jest.mock("./onMessageHandlers/ratingMessageHandler")

describe("messageHandler", () => {
    const sendResponseMock = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should delegate "rating" message to ratingMessageHandler and return true', () => {
        const message: Message<MessageRate> = {
            type: "rating",
            subType: "update",
            data: { url: "http://example.com", rate: 5 },
        }
        const sender = { tab: { id: 1 } }

        const result = messageHandler(message, sender as any, sendResponseMock)

        expect(ratingMessageHandler).toHaveBeenCalledWith(
            message,
            sendResponseMock,
        )
        expect(result).toBe(true)
    })

    it("Should respond synchronously and immediately to the content script when an incorrect message type is detected", () => {
        const message = {
            type: "unsupported",
            data: {},
        }
        const sender = { tab: { id: 1 } }

        const result = messageHandler(
            message as any,
            sender as any,
            sendResponseMock,
        )

        expect(ratingMessageHandler).not.toHaveBeenCalled()
        expect(result).toBe(false)
    })

    it("Should respond synchronously if sender.tab is absent, immediately returning a response to the content script", () => {
        const message: Message<MessageRate> = {
            type: "rating",
            subType: "update",
            data: { url: "http://example.com", rate: 5 },
        }
        const sender = {} // sender.tab is missing

        const result = messageHandler(message, sender, sendResponseMock)

        expect(ratingMessageHandler).not.toHaveBeenCalled()
        expect(result).toBe(false)
    })

    it("Should respond synchronously if message.type is missing, immediately returning a response to the content script", () => {
        const message = {
            data: { url: "http://example.com", rate: 5 },
        } // message.type is missing
        const sender = { tab: { id: 1 } }

        const result = messageHandler(
            message as any,
            sender as any,
            sendResponseMock,
        )

        expect(ratingMessageHandler).not.toHaveBeenCalled()
        expect(result).toBe(false)
    })
})
