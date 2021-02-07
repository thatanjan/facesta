import Requset from 'interfaces/requsetResponse'
import jwtDecode from 'jwt-decode'
import getToken from 'utils/getToken'
import { AnyObject } from 'interfaces/global'

export default (param: Requset | string): AnyObject => {
	let token: string

	if (typeof param === 'string') {
		token = param
		return jwtDecode(token)
	}

	token = getToken(param as Requset)

	return jwtDecode(token)
}
