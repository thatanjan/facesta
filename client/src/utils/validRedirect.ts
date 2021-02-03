import checkValidJwt from 'utils/checkValidJwt'
import { TOKEN_NAME } from 'variables/global'
import { redirectToAuth } from 'utils/authRedirect'

const validRedirect = async (req: any, res: any) => {
	const { cookies } = req

	const token = cookies?.[TOKEN_NAME]

	if (!token) {
		redirectToAuth(res)

		return false
	}

	const isValid = await checkValidJwt(token)

	if (!isValid) return false

	// if (!token || !(await checkValidJwt(token))) {
	// 	redirectToAuth(res)
	// }
}

export default validRedirect
