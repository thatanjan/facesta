import checkValidJwt from 'utils/checkValidJwt'

export default async (token: string) => {
	if (!token) return true

	if (!(await checkValidJwt(token))) {
		return true
	}
	return false
}
