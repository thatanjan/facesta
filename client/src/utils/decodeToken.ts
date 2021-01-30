import Requset from 'interfaces/requsetResponse'
import jwtDecode from 'jwt-decode'
import getToken from 'utils/getToken'

export default (req: Requset) => {
	const token = getToken(req)

	return jwtDecode(token)
}
