interface Params {
	text: string
	position: number
	divider: string
}

const splitText = ({ text, position, divider }: Params) => {
	const mainText = text

	const words: string[] = mainText.split(divider)

	return words[position]
}

export default splitText
