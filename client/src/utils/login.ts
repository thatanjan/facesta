import { setToken } from 'utils/cookieToken'

const login = async (token: string) => {
	setToken(token)
	return true
}

export default login
