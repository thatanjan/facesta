interface Redirect {
	res: {
		writeHead: Function
		end: Function
	}
	query: {
		authentication: string
	}
}

const LOGIN: string = 'login'
const SIGN_UP: string = 'sign_up'

const getRedirectPath = (endpoint: string) => {
	const path = `/authentication/${endpoint}`

	return path
}

const getEndPoint = (authentication: string) => {
	let endpoint: string = ''
	if (authentication === SIGN_UP) {
		endpoint = SIGN_UP
	} else {
		endpoint = LOGIN
	}

	return endpoint
}

const serverRedirect = ({
	res,
	query: { authentication },
}: Redirect): boolean => {
	if (authentication === LOGIN || authentication === SIGN_UP) {
		return true
	}

	const endpoint = getEndPoint(authentication)

	if (res) {
		res.writeHead(302, { Location: getRedirectPath(endpoint) })
		res.end()
		return true
	}

	return false
}

export default serverRedirect
