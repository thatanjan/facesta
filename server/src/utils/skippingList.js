const skippingList = (skip, total) => {
	const empty = { empty: true }

	if (!total || skip < 1) return empty

	const returnNumber = 10
	const newSkip = skip * -10

	let result = { newSkip, returnNumber }

	const absOfNewSkip = Math.abs(newSkip)

	const extra = absOfNewSkip - total

	if (extra < 0) return result

	if (extra >= 10) return empty

	if (extra > 0)
		result = { newSkip: (absOfNewSkip - extra) * -1, returnNumber: 10 - extra }

	return result
}

export default skippingList
