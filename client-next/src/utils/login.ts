import jwtDecode from 'jwt-decode'

interface params {
	setUser: Function
}

const login = ({ setUser }: params) => {
	const token = localStorage.jwt
	const decoded = jwtDecode(token)

	setUser(decoded)
}

export default login
