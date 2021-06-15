import axios from 'axios'

const checkValidJwt = async (jwt: string) => {
	const END_POINT = process.env.NEXT_PUBLIC_SERVER_VALIDATE

	try {
		const isValid = await axios.post(END_POINT as string, { data: { jwt } })

		if (isValid) return true

		return false
	} catch (error) {
		return false
	}
}

export default checkValidJwt
