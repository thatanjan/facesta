import axios from 'axios'
import { ifProduction } from 'variables/global'

// eslint-disable-next-line
const checkValidJwt = async (jwt: string) => {
	const END_POINT = ifProduction
		? process.env.NEXT_PUBLIC_SERVER_VALIDATE
		: 'http://localhost:8000/validate'

	try {
		await axios.post(END_POINT as string, { data: { jwt } })
		return true
	} catch (error) {
		const statusCode = error.response.status

		if (statusCode === 401) {
			// eslint-disable-next-line
			console.log(error.response.data.message)
			return false
		}
	}
}

export default checkValidJwt
