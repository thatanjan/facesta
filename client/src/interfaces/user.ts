export default interface UserPayload {
	id: string
	name: string
	iat: number
	exp: number
}

export interface PropsWithUserData {
	userData: UserPayload
}
