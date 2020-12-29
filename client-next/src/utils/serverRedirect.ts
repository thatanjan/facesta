interface Redirect {
	res: {
		writeHead: Function
		end: Function
	}
	asPath: string
}

const BASE_URL: string = '/authentication/'

const LOGIN: string = `${BASE_URL}login`
const SIGN_UP: string = `${BASE_URL}sign_up`

export const didURLMatch = (asPath: string): boolean => {
	if (asPath === LOGIN || asPath === SIGN_UP) {
		return true
	}

	return false
}

const redirectToAuth = ({ res, asPath }: Redirect): boolean => {
	if (didURLMatch(asPath)) {
		return false
	}

	if (res) {
		res.writeHead(302, { Location: LOGIN })
		res.end()
		return true
	}

	return false
}

export const redirectToHome = ({ res, asPath }: Redirect): boolean => {
	if (!didURLMatch(asPath)) {
		return false
	}

	if (res) {
		res.writeHead(302, { Location: '/' })
		res.end()
		return true
	}

	return false
}

export default redirectToAuth
