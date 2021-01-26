import axios from 'axios'

// eslint-disable-next-line
const checkValidJwt = async (jwt: string) => {
	const END_POINT = 'http://localhost:8000/validate'
	try {
		await axios.post(END_POINT, { data: { jwt } })
		return true
	} catch (error) {
		const statusCode = error.response.status

		if (statusCode === 401) {
			console.log(error.response.data.message)
			return false
		}
	}
}

export default checkValidJwt
