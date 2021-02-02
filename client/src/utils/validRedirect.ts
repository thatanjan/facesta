import getToken from 'utils/getToken'
import Requset from 'interfaces/requsetResponse'
import checkValidJwt from 'utils/checkValidJwt'
import { redirectToAuth } from 'utils/authRedirect'

const validRedirect = async (req: Requset, res: any) => {
	const token = getToken(req)

	console.log(token)

	if (!token) {
		redirectToAuth(res)
		return false
	}

	try {
		await checkValidJwt(token)
	} catch (error) {
		if (error) {
			redirectToAuth(res)
		}
	}

	return true
}

export default validRedirect
