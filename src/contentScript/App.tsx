import "./App.css"

function App() {
    // This is the root component for the content script UI.
    // It's injected into the page by contentScript.tsx.
    // You can start building your UI from here.

    // Example: Sending a message to the background script
    // useEffect(() => {
    //     chrome.runtime.sendMessage({ greeting: "hello from content script" }, (response) => {
    //         if (chrome.runtime.lastError) {
    //             console.error("Message sending failed:", chrome.runtime.lastError);
    //         } else {
    //             console.log("Received response from background:", response);
    //         }
    //     });
    // }, []);

    return (
        <div className="chrome-extension-boilerplate">
            <h1 className="title">Content Script UI</h1>
            <p>This UI is injected into the page by the content script.</p>
            {/* Add your React components here */}
        </div>
    )
}

export default App
