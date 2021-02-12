import Requset from 'interfaces/requsetResponse'
import jwtDecode from 'jwt-decode'
import getToken from 'utils/getToken'
import userPayload from 'interfaces/user'

export default (param: Requset | string): userPayload => {
	let token: string

	if (typeof param === 'string') {
		token = param
		return jwtDecode(token)
	}

	token = getToken(param as Requset)

	return jwtDecode(token)
}
