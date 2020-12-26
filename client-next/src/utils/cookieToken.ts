import Cookies from 'js-cookie'

import { TOKEN_NAME } from './global'

export const setToken = (token: string) => {
	Cookies.set(TOKEN_NAME, token, { path: '/' })
	return true
}

export const removeToken = () => {
	Cookies.remove(TOKEN_NAME)
	return true
}
