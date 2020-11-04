import { GET_USER, SET_CURRENT_USER } from 'redux/actions/types'
import setAuthToken from 'redux/utils/setAuthToken'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const registerUser = userData => ({
	type: GET_USER,
	payload: userData,
})

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	}
}

export const loginUserAction = userData => dispatch => {
	axios
		.post('/api/user/login', userData)
		.then(response => {
			// save token to local storage
			const { token } = response.data

			localStorage.setItem('jwtToken', token)
			setAuthToken(token)

			// decode token
			const decoded = jwt_decode(token)

			// set current user
			dispatch(setCurrentUser(decoded))
		})
		.catch(({ response }) => console.log(response))
}
