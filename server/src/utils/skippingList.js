const skippingList = (skip, total) => {
	if (skip <= total) {
		return { newSkip: skip, returnNumber: 10 }
	}

	const rest = total - (skip - 10)

	if (rest > 10 || rest < 0) {
		return { empty: true }
	}

	return { newSkip: total, returnNumber: rest }
}

export default skippingList
