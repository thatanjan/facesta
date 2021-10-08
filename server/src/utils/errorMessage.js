const theErrorMessage = errorMessage => {
	if (errorMessage === undefined) return 'Something went wrong'
	if (
		errorMessage instanceof Error ||
		(errorMessage === 'object' && errorMessage.message)
	)
		return errorMessage.message

	if (errorMessage === null) return null

	return errorMessage
}

export default errorMessage => ({
	errorMessage: theErrorMessage(errorMessage),
})
