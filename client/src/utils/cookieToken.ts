import Cookies from 'js-cookie'

import { TOKEN_NAME } from 'variables/global'

export const setToken = (token: string) => {
	Cookies.set(TOKEN_NAME, token, { path: '/', expires: 3 })
	return true
}

export const removeToken = () => {
	Cookies.remove(TOKEN_NAME)
	return true
}
