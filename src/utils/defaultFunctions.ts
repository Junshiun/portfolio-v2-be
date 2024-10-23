const JsonParse = (src: unknown) => {
    try {
        return JSON.parse(src as string);
    } catch {
        return src
    }
}

const DefaultFunc = {
    JsonParse
}

export default DefaultFunc