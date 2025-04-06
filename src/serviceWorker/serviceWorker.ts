import { initialiseEvents } from "./events"
import { getExtensionState, setExtensionState } from "./storage/extensionState"

console.log("Initialising Service Worker")

// Initialize extension state if not already set
async function initializeExtensionState() {
    try {
        const state = await getExtensionState()
        console.log("Extension state initialized:", state)
    } catch (error) {
        console.error("Failed to initialize extension state:", error)
        // Ensure extension is enabled by default
        await setExtensionState(true)
    }
}

// Initialize events and state
initialiseEvents()
initializeExtensionState()
