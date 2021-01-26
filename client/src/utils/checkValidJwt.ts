import axios from 'axios'

const checkValidJwt = async (jwt: string) => {
	const END_POINT = 'http://localhost:8000/validate'
	try {
		await axios.post(END_POINT, { data: { jwt } })
	} catch (error) {
		const statusCode = error.response.status

		if (statusCode === 401) {
			console.log(error.response.data.message)
			console.log('something went wrong')
			// redirectToAuth({ res, asPath })
			return {}
		}
	}
}

export default checkValidJwt
