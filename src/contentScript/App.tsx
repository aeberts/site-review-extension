import "./App.css"
import { Rating } from "./components/Rating/Rating"
import { useEffect, useState } from "react"
import { Message, MessageExtensionState } from "../types/message.types"
import { sendMessage } from "./messages/sendMessage"

function App() {
    const [isEnabled, setIsEnabled] = useState<boolean>(true)
    
    console.log("App component initializing, default state:", isEnabled)

    useEffect(() => {
        async function checkExtensionState() {
            try {
                console.log("Checking extension state...")
                const enabled = await sendMessage<MessageExtensionState, boolean>({
                    type: "extension",
                    subType: "getState",
                    data: { enabled: undefined },
                })
                console.log("Extension state received:", enabled)
                // Handle the case where enabled might be undefined
                setIsEnabled(enabled !== undefined ? enabled : true)
            } catch (error) {
                console.error("Failed to get extension state:", error)
                // Ensure we default to enabled on error
                setIsEnabled(true)
            }
        }
        checkExtensionState()

        // Listen for extension state changes
        const handleMessage = (message: Message<any>) => {
            console.log("Content script received message:", message)
            if (message.type === "extension" && message.subType === "stateChanged") {
                console.log("Setting extension state to:", message.data.enabled)
                setIsEnabled(message.data.enabled)
            }
        }
        chrome.runtime.onMessage.addListener(handleMessage)
        return () => chrome.runtime.onMessage.removeListener(handleMessage)
    }, [])

    console.log("App rendering with isEnabled:", isEnabled)

    if (!isEnabled) {
        console.log("Extension disabled, not rendering rating panel")
        return null
    }

    console.log("Extension enabled, rendering rating panel")
    return (
        <div className="chrome-extension-boilerplate">
            <div className="rating-container">
                <h3>Rate this website</h3>
                <Rating />
            </div>
        </div>
    )
}

export default App
