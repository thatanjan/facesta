const capitalize = (text: string) => {
	const words: string[] = text.split(' ')

	const capitalizeText: string = words
		.map((word: string) => {
			return word[0].toUpperCase() + word.substring(1)
		})
		.join(' ')

	return capitalizeText
}

export default capitalize
