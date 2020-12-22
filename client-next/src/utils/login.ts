import jwtDecode from 'jwt-decode'

interface params {
	setUser: Function
}

const login = async ({ setUser }: params) => {
	try {
		const token = localStorage.jwt
		const decoded = jwtDecode(token)

		setUser(decoded)
		return true
	} catch (err) {
		return false
	}
}

export default login
