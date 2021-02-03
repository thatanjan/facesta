import axios from 'axios'
import { ifProduction } from 'variables/global'

// eslint-disable-next-line
const checkValidJwt = async (jwt: string) => {
	const END_POINT = ifProduction
		? process.env.NEXT_PUBLIC_SERVER_VALIDATE
		: 'http://localhost:8000/validate'

	try {
		const isValid = await axios.post(END_POINT as string, { data: { jwt } })

		if (isValid) return true
	} catch (error) {
		const statusCode = error.response.status
		const responseMessage = error.response.data.message

		if (error) {
			// eslint-disable-next-line
			console.log(responseMessage)
			return false
		}
	}
}

export default checkValidJwt
