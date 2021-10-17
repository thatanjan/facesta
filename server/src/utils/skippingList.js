const skippingList = (skip, total) => {
	const empty = { empty: true }

	const rest = total - skip

	if (!total || !rest) return empty

	let newSkip = (skip + 10) * -1
	let returnNumber = 10

	if (rest < -10) return empty

	if (rest < 0) {
		return { newSkip: total * -1, returnNumber: total }
	}

	if (rest < 10) {
		newSkip += rest
		returnNumber = rest
	}

	return { newSkip, returnNumber }
}

export default skippingList
