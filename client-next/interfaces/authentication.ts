export interface error {
	email?: String
	password?: String
	name?: String
	confirmPassword?: String
}

export interface LoginData {
	logInUser: {
		success: Boolean
		token: String | null
		message: String | null
	}
}
