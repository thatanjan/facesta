const parseCamelCase = (text: string) => {
	const parsedText = text.replace(/([A-Z])/g, ' $1')

	return parsedText
}

export default parseCamelCase
