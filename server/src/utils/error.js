const theErrorMessage = errorMessage => {
	console.log(errorMessage)
	if (
		errorMessage instanceof Error ||
		(errorMessage === 'object' && errorMessage.message)
	)
		return errorMessage.message

	if (errorMessage === null) return null

	return errorMessage
}

export default (success, errorMessage, message) => ({
	success,
	message,
	errorMessage: theErrorMessage(errorMessage),
})
