const AUTHENTICATION = 'authentication'
const createAuthUrl = (restUrl: string): string =>
	`/${AUTHENTICATION}${restUrl}`

const TOKEN_NAME: string = 'jwt'

const LOGIN = 'login'
const LOGOUT = 'logout'
const SIGN_UP = 'sign-up'

const LOGOUT_URL = createAuthUrl(`/${LOGOUT}`)
const LOGIN_URL = createAuthUrl(`/${LOGIN}`)
const SIGN_UP_URL = createAuthUrl(`${SIGN_UP}`)

const DATE_OF_BIRTH = 'dateOfBirth'
const SKILLS = 'skills'

const PRODUCTION = 'production'

export const ifProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === PRODUCTION

const END_POINT = ifProduction
	? process.env.NEXT_PUBLIC_SERVER_URL
	: 'http://localhost:8000/graphql'

export {
	AUTHENTICATION,
	TOKEN_NAME,
	DATE_OF_BIRTH,
	SKILLS,
	LOGIN,
	SIGN_UP,
	END_POINT,
	LOGOUT,
	LOGOUT_URL,
	SIGN_UP_URL,
	LOGIN_URL,
}
