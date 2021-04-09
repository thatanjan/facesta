export default interface UserPayload {
	id: string
	iat: number
	exp: number
}

export interface PropsWithUserData {
	userData: UserPayload
}
