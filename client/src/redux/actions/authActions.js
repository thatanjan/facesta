import { SET_CURRENT_USER } from 'redux/actions/types'
import setAuthToken from 'redux/utils/setAuthToken'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	}
}

const loginUser = (token, dispatch) => {
	localStorage.setItem('jwtToken', token)
	setAuthToken(token)
	// decode token
	const decoded = jwt_decode(token)
	// set current user
	dispatch(setCurrentUser(decoded))
}

export const loginUserAction = userData => dispatch => {
	axios
		.post('/api/user/login', userData)
		.then(({ data: { token } }) => {
			loginUser(token, dispatch)
		})
		.catch(response => console.log(response))
}

export const registerUserAction = userData => dispatch => {
	axios
		.post('/api/user/register', userData)
		.then(({ data: { token } }) => {
			console.log('token  ', token)
			loginUser(token, dispatch)
		})
		.catch(response => console.log('error'))
}
