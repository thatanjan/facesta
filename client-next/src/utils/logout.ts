import Cookies from 'js-cookie'

import { TOKEN_NAME } from 'utils/global'

const logout = (setUser: Function, router: { [key: string]: any }) => {
	Cookies.remove(TOKEN_NAME)
	setUser({})

	if (typeof window !== 'undefined') {
		router.push('/login')
	}
}

export default logout
