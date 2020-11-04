import { GET_USER, SET_CURRENT_USER } from 'redux/actions/types'
import isEmpty from 'utils/isEmpty'

const INITIAL_STATE = {
	isAuthenticated: false,
	user: {},
}

export const authReducer = (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case GET_USER:
			return {
				...state,
				user: payload,
			}

		case SET_CURRENT_USER:
			console.log(payload)
			console.log(state)
			return {
				...state,
				isAuthenticated: !isEmpty(payload),
				user: payload,
			}

		default:
			return state
	}
}
