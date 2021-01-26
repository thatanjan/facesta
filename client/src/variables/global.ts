const TOKEN_NAME: string = 'jwt'

const LOGIN = 'login'
const SIGN_UP = 'sign-up'

const DATE_OF_BIRTH = 'dateOfBirth'
const SKILLS = 'skills'

const PRODUCTION = 'production'

export const ifProduction = process.env.VERCEL_ENV === PRODUCTION

const END_POINT = ifProduction
	? process.env.SERVER_URL
	: 'http://localhost:8000/graphql'

export { TOKEN_NAME, DATE_OF_BIRTH, SKILLS, LOGIN, SIGN_UP, END_POINT }
