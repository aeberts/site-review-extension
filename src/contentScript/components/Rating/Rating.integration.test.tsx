import { render, screen } from "@testing-library/react"
import { JestChrome } from "jest-chrome/types/jest-chrome"
import { Rating } from "./Rating"

describe("<Rating /> integration with sendMessage", () => {
    let mockSendMessage: jest.Mock
    beforeEach(() => {
        mockSendMessage = jest.fn()
        const jestChrome = chrome as any as JestChrome
        jestChrome.runtime.sendMessage.mockImplementation(mockSendMessage)
    })
    it("fetches the available rating from the service worker", () => {
        render(<Rating />)
        expect(mockSendMessage).toHaveBeenCalledTimes(1)
        expect(mockSendMessage).toHaveBeenCalledWith(
            {
                type: "rating",
                subType: "get",
                data: {
                    url: "http://localhost/",
                },
            },
            expect.any(Function),
        )
    })
    it("sends a message updating the rating to the service worker", () => {
        render(<Rating />)
        const latestInput = screen.getByTestId("input-4")
        latestInput.click()
        expect(mockSendMessage).toHaveBeenCalledTimes(2)
        expect(mockSendMessage).toHaveBeenCalledWith(
            {
                data: { rate: 5, url: "http://localhost/" },
                subType: "update",
                type: "rating",
            },
            expect.any(Function),
        )
    })
})
