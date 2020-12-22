export interface Error {
	email?: String
	password?: String
	name?: String
	confirmPassword?: String
}

interface Output {
	success: Boolean
	token: string
	message: string | null
}

export interface LoginOutput extends Error {
	loginUser: Output
}

export interface LoginInput {
	email: string
	password: string
}

export interface RegisterInput extends LoginInput {
	name: string
	confirmPassword: string
}

export interface RegisterOutput extends Error {
	registerUser: Output
}

export interface RedirectLogin {
	successful: boolean
	redirect: Function
	path?: String
}
