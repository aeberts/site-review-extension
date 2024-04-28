import { MessageRate } from "../../types/message.types"
import { ratingMessageHandler } from "./onMessageHandlers/ratingMessageHandler"

export function messageHandler(
    message: Message,
    sender: chrome.runtime.MessageSender,
    sendResponse: SendResponseCallback,
) {
    if (sender.tab && message.type) {
        switch (message.type) {
            case "rating":
                ratingMessageHandler(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    message as any as Message<MessageRate>,
                    sendResponse,
                )
                break
            default:
                return false
        }
        return true // We will process the messages asynchronously
    }
    return false
}
