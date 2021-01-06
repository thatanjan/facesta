export const throwError = (message) => {
    const error = new Error()
    error.message = message
    return error
}

export const sendMessage = (success, message) => ({
    success,
    errorMessage: typeof message === 'object' ? message.message : message,
})
