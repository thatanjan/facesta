export default (success, errorMessage, message) => ({
    success,
    message,
    errorMessage:
        typeof errorMessage === 'object' ? errorMessage.message : errorMessage,
})
