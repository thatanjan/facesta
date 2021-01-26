const TOKEN_NAME: string = 'jwt'

const LOGIN = 'login'
const SIGN_UP = 'sign-up'

const DATE_OF_BIRTH = 'dateOfBirth'
const SKILLS = 'skills'

const PRODUCTION = 'production'

const END_POINT =
	process.env.VERCEL_ENV === PRODUCTION
		? process.env.SERVER_URL
		: 'http://localhost:8000/graphql'

export { TOKEN_NAME, DATE_OF_BIRTH, SKILLS, LOGIN, SIGN_UP, END_POINT }
