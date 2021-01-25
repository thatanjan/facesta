interface Params {
	writeHead: Function
	end: Function
}

const serverRedirect = (res: Params, url: string): boolean => {
	if (res) {
		res.writeHead(302, { Location: url })
		res.end()
		return true
	}
	return false
}

export default serverRedirect
