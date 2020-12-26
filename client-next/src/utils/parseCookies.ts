import { parse } from 'cookie'
import Cookies from 'js-cookie'

const parseCookies = (req: any) => {
	if (!req) {
		const token: string | undefined = Cookies.get('jwt')

		return { jwt: token }
	}

	if (req.cookies) return req.cookies

	const cookie: any = req.headers?.cookie || ''

	return parse(req ? cookie : document.cookie)
}

export default parseCookies
