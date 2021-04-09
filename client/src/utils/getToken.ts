import { TOKEN_NAME } from 'variables/global'
import Requset from 'interfaces/requsetResponse'

export default (req: Requset) => {
	const { cookies } = req

	return cookies?.[TOKEN_NAME]
}
