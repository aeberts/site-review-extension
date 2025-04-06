export interface MessageRate {
    url: string
    rate?: number
}

export interface MessageExtensionState {
    enabled?: boolean
    clearRatings?: boolean
}

export type MessageType = "rating" | "extension"
export type MessageSubType = "get" | "update" | "getState" | "setState" | "stateChanged" | "clearRatings"

export interface Message<T> {
    type: MessageType
    subType: MessageSubType
    data: NonNullable<T>
}
