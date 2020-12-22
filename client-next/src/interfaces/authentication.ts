export interface Error {
	email?: String
	password?: String
	name?: String
	confirmPassword?: String
}

interface output {
	success: Boolean
	token: string
	message: string | null
}

export interface LoginOutput extends Error {
	loginUser: output
}

export interface LoginInput {
	email: string
	password: string
}

export interface registerInput extends LoginInput {
	name: string
	confirmPassword: string
}

export interface registerOutput extends Error {
	registerUser: output
}
