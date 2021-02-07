import Requset from 'interfaces/requsetResponse'
import jwtDecode from 'jwt-decode'
import getToken from 'utils/getToken'

export default (param: Requset | string) => {
	let token: string

	if (typeof param === 'string') {
		token = param
		return jwtDecode(token)
	}

	token = getToken(param as Requset)

	return jwtDecode(token)
}
