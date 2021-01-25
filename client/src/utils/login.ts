import jwtDecode from 'jwt-decode'
import { setToken } from 'utils/cookieToken'

interface params {
	setUser: Function
	token: string
}

const login = async ({ setUser, token }: params) => {
	setToken(token)

	const decodedToken: { [key: string]: string | number } = jwtDecode(token)

	setUser(decodedToken)

	return true
}

export default login
