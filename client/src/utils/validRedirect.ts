import getToken from 'utils/getToken'
import Requset from 'interfaces/requsetResponse'
import checkValidJwt from 'utils/checkValidJwt'
import { redirectToAuth } from 'utils/authRedirect'

const validRedirect = async (req: Requset, res: any) => {
	const token = getToken(req)

	if (!token) {
		redirectToAuth(res)

		return false
	}

	const isValid = await checkValidJwt(token)

	if (!isValid) return false

	return true
}

export default validRedirect
