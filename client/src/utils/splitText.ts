interface Params {
	text: string
	position: number
	divider: string
}

const splitText = ({ text, position, divider }: Params): string => {
	if (!text) {
		return ''
	}

	const mainText = text

	const words: string[] = mainText.split(divider)

	return words[position]
}

export default splitText
