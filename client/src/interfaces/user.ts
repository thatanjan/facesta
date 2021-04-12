export default interface UserPayload {
	id: string
	iat: number
	exp: number
}

export interface PropsWithUserData {
	userData: UserPayload
}

export interface User {
	_id: string
	profile: {
		name: string
		profilePicture: string
	}
}
