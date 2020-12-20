export interface error {
	email?: String
	password?: String
	name?: String
	confirmPassword?: String
}

export interface LoginData {
	success: Boolean
	token: String
}
