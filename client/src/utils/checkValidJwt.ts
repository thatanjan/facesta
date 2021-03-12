import axios from 'axios'
import { ifProduction, END_POINT } from 'variables/global'

// eslint-disable-next-line
const checkValidJwt = async (jwt: string) => {
	const END_POINT = ifProduction
		? process.env.NEXT_PUBLIC_SERVER_VALIDATE
		: 'http://localhost:9000/validate'

	try {
		const isValid = await axios.post(END_POINT as string, { data: { jwt } })

		if (isValid) return true
	} catch (error) {
		return false
	}
}

export default checkValidJwt
