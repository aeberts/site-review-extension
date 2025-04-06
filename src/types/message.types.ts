export interface MessageRate {
    url: string
    rate?: number
}

export type MessageType = "rating" | "extension"
export type MessageSubtype = "get" | "update" | "getState" | "setState" | "stateChanged"

export interface MessageExtensionState {
    enabled?: boolean
}

export interface Message<T> {
    type: MessageType
    subType: MessageSubtype
    data: NonNullable<T>
}
