import { Message, MessageExtensionState } from "../../types/message.types"
import { extensionStateHandler } from "./onMessageHandlers/extensionStateHandler"
import { ratingMessageHandler } from "./onMessageHandlers/ratingMessageHandler"

type SendResponseCallback = (response?: any) => void

export function messageHandler(
    message: Message<unknown>,
    sender: chrome.runtime.MessageSender,
    sendResponse: SendResponseCallback,
) {
    console.log("Service worker received message:", message, "from sender:", sender)

    // Check if message.type is defined
    if (!message.type) {
        console.error("Invalid message: missing type")
        sendResponse({ statusCode: 400, data: "Invalid message: missing type" })
        return false
    }

    // Process the message based on its type
    switch (message.type) {
        case "rating":
            console.log("Processing rating message")
            ratingMessageHandler(
                message as unknown as Parameters<typeof ratingMessageHandler>[0],
                sendResponse,
            )
            break
        case "extension":
            console.log("Processing extension state message")
            extensionStateHandler(
                message as Message<MessageExtensionState>,
            ).then(sendResponse)
            break
        default:
            console.error("Unknown message type:", message.type)
            sendResponse({ statusCode: 404, data: "Unknown message type" })
            return false
    }
    return true // We will process the messages asynchronously
}
