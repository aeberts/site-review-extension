export function clearUrlParams(url: string) {
    if (typeof url === "string") {
        const urlObj = new URL(url)
        urlObj.search = ""
        return urlObj.toString()
    }
    return url
}
