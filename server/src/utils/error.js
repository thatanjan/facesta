export default ({ success, message, errorMessage }) => ({
    success,
    message,
    errorMessage:
        typeof errorMessage === 'object' ? errorMessage.message : errorMessage,
})
