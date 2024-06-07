import { MessageRate } from "../../../types/message.types"

export async function getRateFromCache(
    sendResponse: SendResponseCallback,
    data?: MessageRate,
) {
    try {
        if (typeof data?.url === "string") {
            const rateObject = await chrome.storage.local.get([data.url])
            sendResponse({ statusCode: 200, data: rateObject[data.url] })
        } else {
            throw new Error("URL must exist to provide rate information")
        }
    } catch (error) {
        sendResponse({ statusCode: 500 })
    }
    return Promise.resolve()
}
