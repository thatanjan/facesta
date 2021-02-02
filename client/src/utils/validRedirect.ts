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
		const result = await checkValidJwt(token)
		console.log(result)
	} catch (error) {
		if (error) {
			redirectToAuth(res)
		}
	}

	return true

	// if (!token || !(await checkValidJwt(token))) {
	// 	redirectToAuth(res)
	// }
}

export default validRedirect
