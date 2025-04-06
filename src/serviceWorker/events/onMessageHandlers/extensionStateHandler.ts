import { Message, MessageExtensionState } from "../../../types/message.types"
import { getExtensionState, setExtensionState } from "../../storage/extensionState"

/**
 * Handles messages related to the extension state (enabled/disabled)
 * @param message - The message containing extension state data
 * @returns A promise that resolves to a response object
 */
export async function extensionStateHandler(
    message: Message<MessageExtensionState>,
): Promise<{ statusCode: number; data?: boolean }> {
    console.log("Extension state handler received message:", message)
    
    try {
        if (message.subType === "getState") {
            console.log("Getting extension state")
            const state = await getExtensionState()
            console.log("Current extension state:", state)
            return { statusCode: 200, data: state }
        }

        if (message.subType === "setState" && message.data.enabled !== undefined) {
            console.log("Setting extension state to:", message.data.enabled)
            await setExtensionState(message.data.enabled)
            
            // Notify all tabs about the state change
            console.log("Notifying tabs about state change")
            const tabs = await chrome.tabs.query({})
            console.log("Found tabs:", tabs.length)
            
            tabs.forEach((tab) => {
                if (tab.id) {
                    console.log("Sending state change to tab:", tab.id)
                    chrome.tabs.sendMessage(tab.id, {
                        type: "extension",
                        subType: "stateChanged",
                        data: { enabled: message.data.enabled },
                    })
                }
            })
            return { statusCode: 200, data: message.data.enabled }
        }

        console.log("Invalid extension state message subType:", message.subType)
        return { statusCode: 400, data: false }
    } catch (error) {
        console.error("Extension state handler error:", error)
        return { statusCode: 500 }
    }
}
