function isEmptyObject(value: { [key: string]: any }) {
	return Object.keys(value).length === 0 && value.constructor === Object
}

export default isEmptyObject
