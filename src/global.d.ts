type MessageType = "rating"

type MessageSubtype = "update" | "get"

interface Message<T = MessageDataType> {
    type: MessageType
    subType: MessageSubtype
    data?: T
}

interface MessageResponse<T = MessageDataResponseType> {
    statusCode: number
    data?: T
}
type SendResponseCallback = (response?: MessageResponse) => void
type MessageDataType = number
type MessageDataResponseType = unknown

declare module "jest-chrome/lib/index.esm"
declare module "jest-chrome/lib/index.cjs"
