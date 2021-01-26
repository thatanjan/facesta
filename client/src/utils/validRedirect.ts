import checkValidJwt from 'utils/checkValidJwt'
import { TOKEN_NAME } from 'variables/global'
import { redirectToAuth } from 'utils/authRedirect'

const validRedirect = async (req: any, res: any) => {
	const { cookies } = req

	const token = cookies?.[TOKEN_NAME]

	if (!token || !(await checkValidJwt(token))) {
		redirectToAuth(res)
	}
}

export default validRedirect
