import { MessageRate } from "@types/messageTypes"

async function updateCacheRating(
    sendResponse: SendResponseCallback,
    data?: MessageRate,
): Promise<void> {
    if (typeof data?.url === "string") {
        try {
            await chrome.storage.local.set({ [data.url]: data.rate })
            return sendResponse({ statusCode: 200 })
        } catch (error) {
            console.log("Update Cache failed", error)
            return sendResponse({ statusCode: 500 })
        }
    }
    sendResponse({ statusCode: 400 })
}

async function getRateFromCache(
    sendResponse: SendResponseCallback,
    data?: MessageRate,
) {
    try {
        if (typeof data?.url === "string") {
            const rateObject = await chrome.storage.local.get([data.url])
            return sendResponse({ statusCode: 200, data: rateObject[data.url] })
        } else {
            throw new Error("URL must exist to provide rate information")
        }
    } catch (error) {
        console.log("Failed to retrieved counter from cache", error)
        return sendResponse({ statusCode: 500 })
    }
}

export async function ratingMessageHandler(
    message: Message<MessageRate>,
    sendResponse: SendResponseCallback,
) {
    if (message.subType) {
        switch (message.subType) {
            case "get":
                getRateFromCache(sendResponse, message.data)
                break
            case "update":
                updateCacheRating(sendResponse, message.data)
                break
        }
        return
    }
    sendResponse({ statusCode: 405 })
}
