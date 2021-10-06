const skippingList = (skip, total) => {
	let newSkip = (skip + 10) * -1
	let returnNumber = 10

	const rest = total - skip

	if (rest < -10) return { empty: true }

	if (rest < 0) {
		return { newSkip: total * -1, returnNumber: Math.abs(rest) }
	}

	if (rest < 10) {
		newSkip += rest
		returnNumber = rest
	}

	return { newSkip, returnNumber }
}

export default skippingList
