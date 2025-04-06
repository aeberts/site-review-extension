/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message } from "../../types/message.types"
import { messageHandler } from "./eventHandler"
import { ratingMessageHandler } from "./onMessageHandlers/ratingMessageHandler"
import { extensionStateHandler } from "./onMessageHandlers/extensionStateHandler"

jest.mock("./onMessageHandlers/ratingMessageHandler", () => ({
    ratingMessageHandler: jest.fn(),
}))

jest.mock("./onMessageHandlers/extensionStateHandler", () => ({
    extensionStateHandler: jest.fn().mockResolvedValue({ statusCode: 200 }),
}))

describe("messageHandler", () => {
    let sendResponseMock: jest.Mock
    let sender: chrome.runtime.MessageSender

    beforeEach(() => {
        sendResponseMock = jest.fn()
        sender = {
            tab: { id: 1 } as chrome.tabs.Tab,
        } as chrome.runtime.MessageSender
        jest.clearAllMocks()
    })

    it("Should call ratingMessageHandler if message type is rating", () => {
        const message = {
            type: "rating",
            subType: "update",
            data: { url: "http://example.com", rate: 5 },
        }

        messageHandler(message as Message<unknown>, sender, sendResponseMock)

        expect(ratingMessageHandler).toHaveBeenCalled()
    })

    it("Should call extensionStateHandler if message type is extension", () => {
        const message = {
            type: "extension",
            subType: "setState",
            data: { enabled: true },
        }

        messageHandler(message as Message<unknown>, sender, sendResponseMock)

        expect(extensionStateHandler).toHaveBeenCalled()
    })

    it("Should return false if message type is unknown", () => {
        const message = {
            type: "unknown",
            subType: "update",
            data: {},
        }

        const result = messageHandler(message as Message<unknown>, sender, sendResponseMock)

        expect(result).toBe(false)
        expect(sendResponseMock).toHaveBeenCalledWith({
            statusCode: 404,
            data: "Unknown message type",
        })
    })

    it("Should return false if message type is missing", () => {
        const message = {
            subType: "update",
            data: {},
        } as Message<unknown>

        const result = messageHandler(message, sender, sendResponseMock)

        expect(result).toBe(false)
        expect(sendResponseMock).toHaveBeenCalledWith({
            statusCode: 400,
            data: "Invalid message: missing type",
        })
    })
})
