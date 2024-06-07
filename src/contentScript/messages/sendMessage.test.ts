/* eslint-disable @typescript-eslint/no-explicit-any */
import { JestChrome } from "jest-chrome/types/jest-chrome"
import { sendMessage } from "./sendMessage"

describe("sendMessage", () => {
    it("should send the message correctly", async () => {
        const message: Message = { type: "rating", subType: "get" }
        const response: MessageResponse = { statusCode: 200, data: 2 }

        const jestChrome = chrome as any as JestChrome

        jestChrome.runtime.sendMessage.mockImplementation(
            (_message: any, callback: any) => {
                return callback(response)
            },
        )

        const promiseResult = await sendMessage(message)

        expect(promiseResult).toEqual(2)
        expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(
            message,
            expect.any(Function),
        )
    })
    it("should resolve the promise if response success", (done) => {
        const message: Message = { type: "rating", subType: "get" }
        const response: MessageResponse = { statusCode: 200, data: 2 }

        const jestChrome = chrome as any as JestChrome

        jestChrome.runtime.sendMessage.mockImplementation(
            (_message: any, callback: any) => {
                return callback(response)
            },
        )

        sendMessage(message).then((data) => {
            expect(data).toBe(2)
            done()
        })
    })
    it("should reject the promise if response fails", (done) => {
        const message: Message = { type: "rating", subType: "get" }
        const response: MessageResponse = {
            statusCode: 500,
            data: "background script error",
        }

        const jestChrome = chrome as any as JestChrome

        jestChrome.runtime.sendMessage.mockImplementation(
            (_message: any, callback: any) => {
                return callback(response)
            },
        )

        sendMessage(message).catch((error) => {
            expect(error).toBe("background script error")
            done()
        })
    })
})
