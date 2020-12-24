import { parse } from 'cookie'

const parseCookies = (req: any) => {
	if (req.cookies) return req.cookies

	const cookie: any = req.headers?.cookie || ''

	return parse(req ? cookie : document.cookie)
}

export default parseCookies
