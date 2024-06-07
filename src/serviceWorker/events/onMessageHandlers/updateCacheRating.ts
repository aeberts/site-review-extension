import { MessageRate } from "../../../types/message.types"

export async function updateCacheRating(
    sendResponse: SendResponseCallback,
    data?: MessageRate,
): Promise<void> {
    if (typeof data?.url === "string") {
        try {
            await chrome.storage.local.set({ [data.url]: data.rate })
            sendResponse({ statusCode: 200 })
        } catch (error) {
            sendResponse({ statusCode: 500 })
        }
    } else {
        sendResponse({ statusCode: 400 })
    }
    return Promise.resolve()
}
