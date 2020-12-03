export const throwError = (message) => {
    const error = new Error()
    error.message = message
    return error
}
