export interface error {
	email?: String
	password?: String
	name?: String
	confirmPassword?: String
}

export interface LoginData {
	loginUser: {
		success: Boolean
		token: string
		message: string | null
	}
}
