const skippingList = (skip, total) => {
	let newSkip
	let returnNumber

	const rest = total - skip

	if (rest < -10) {
		return { empty: true }
	}

	if (rest >= -10 && rest < 0) {
		newSkip = -Math.abs(total)
		returnNumber = Math.abs(rest)
	}

	return { newSkip, returnNumber }
}

export default skippingList
