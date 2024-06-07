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

    it("should return false for unsupported message type", () => {
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

    it("should return false if sender.tab is not present", () => {
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

    it("should return false if message.type is not present", () => {
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
