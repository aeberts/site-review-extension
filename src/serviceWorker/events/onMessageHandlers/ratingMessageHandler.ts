import { MessageRate } from "../../../types/message.types"
import { getRateFromCache } from "./getRateFromCache"
import { updateCacheRating } from "./updateCacheRating"

export async function ratingMessageHandler(
    message: Message<MessageRate>,
    sendResponse: SendResponseCallback,
) {
    if (message.subType) {
        switch (message.subType) {
            case "get":
                return await getRateFromCache(sendResponse, message.data)
            case "update":
                return await updateCacheRating(sendResponse, message.data)
        }
    }
    sendResponse({ statusCode: 405 })
    return Promise.resolve()
}
