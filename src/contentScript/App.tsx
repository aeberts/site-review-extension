import logo from "@assets/logo.svg"
import "./App.css"
import { Rating } from "./components/Rating/Rating"

function App() {
    return (
        <>
            <div className="chrome-extension-boilerplate">
                <a
                    href="https://github.com/EduardoAC/site-review-extension"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={chrome.runtime.getURL(logo)}
                        className="logo"
                        alt="Site Review Demo logo"
                    />
                </a>
                <h1 className="title">Site Reviewer</h1>
                <div className="card">
                    <div className="card__content">
                        <Rating />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
