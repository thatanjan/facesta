export const throwError = (message) => {
    const error = new Error()
    error.message = message
    return error
}

export const sendMessage = (success, message) => ({
    success,
    message,
})
