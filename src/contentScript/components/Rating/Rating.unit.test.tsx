// @ts-ignore: React is needed for JSX
import React from "react"
import { render, screen } from "@testing-library/react"
import { Rating } from "./Rating"

import { sendMessage } from "../../messages/sendMessage"
jest.mock("../../messages/sendMessage")
describe("<Rating /> component logic", () => {
    afterAll(() => {
        jest.clearAllMocks()
    })
    it("renders without errors", () => {
        render(<Rating />)
        const ratingComponent = screen.getByTestId("rating-component")
        expect(ratingComponent).toBeInTheDocument()
        // You can add more assertions here to verify the structure of the component
    })
    // it("renders 5 star icons within screen", () => {
    //     render(<Rating />)
    // })
    it("renders the correct number of stars based on the initial rating", async () => {
        const mockRating = 3
        const mockSendMessage = sendMessage as jest.MockedFunction<
            typeof sendMessage
        >

        mockSendMessage.mockResolvedValueOnce(mockRating)
        render(<Rating />)

        // Wait for the initial rating to be fetched and applied
        await screen.findByTestId("rating-component")

        // Check that the correct number of stars are rendered
        const stars = screen.getAllByTestId("star")
        expect(stars).toHaveLength(5) // Assuming you always render 5 stars
        for (let i = 0; i < mockRating; i++) {
            expect(stars[i]).toHaveStyle("color: #ffc107") // Assuming active star color is #ffc107
        }
        for (let i = mockRating; i < 5; i++) {
            expect(stars[i]).toHaveStyle("color: #e4e5e9") // Assuming inactive star color is #e4e5e9
        }
    })
})
