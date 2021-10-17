import cookie from 'js-cookie'
import axios from 'axios'

import { TOKEN_NAME } from 'variables/global'

const checkValidJwt = async (jwt: string) => {
	const END_POINT = process.env.NEXT_PUBLIC_SERVER_VALIDATE

	try {
		const isValid = await axios.post(END_POINT as string, { data: { jwt } })

		if (isValid) return true

		cookie.remove(TOKEN_NAME)

		return false
	} catch (error) {
		return false
	}
}

export default checkValidJwt
