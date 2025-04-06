/**
 * Gets the current extension state (enabled/disabled)
 * @returns A promise that resolves to a boolean indicating if the extension is enabled
 */
export async function getExtensionState(): Promise<boolean> {
    try {
        const result = await chrome.storage.local.get("extensionEnabled")
        // Default to enabled if not set
        return result.extensionEnabled !== undefined ? result.extensionEnabled : true
    } catch (error) {
        console.error("Error getting extension state:", error)
        // Default to enabled on error
        return true
    }
}

/**
 * Sets the extension state (enabled/disabled)
 * @param enabled - Boolean indicating if the extension should be enabled
 * @returns A promise that resolves when the state is set
 */
export async function setExtensionState(enabled: boolean): Promise<void> {
    try {
        await chrome.storage.local.set({ extensionEnabled: enabled })
    } catch (error) {
        console.error("Error setting extension state:", error)
        throw error
    }
}

/**
 * Clears all ratings from storage
 * @returns A promise that resolves when ratings are cleared
 */
export async function clearAllRatings(): Promise<void> {
    try {
        // Get all keys from storage
        const items = await chrome.storage.local.get(null)
        
        // Filter out only the rating keys (they start with 'rating_')
        const ratingKeys = Object.keys(items).filter(key => key.startsWith('rating_'))
        
        // If there are rating keys, remove them
        if (ratingKeys.length > 0) {
            await chrome.storage.local.remove(ratingKeys)
        }
    } catch (error) {
        console.error("Error clearing ratings:", error)
        throw error
    }
}
