import { SET_CURRENT_USER } from 'redux/actions/types'
import isEmpty from 'utils/isEmpty'

const INITIAL_STATE = {
	isAuthenticated: false,
	user: {},
}

const authReducer = (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(payload),
				user: payload,
			}

		default:
			return state
	}
}

export default authReducer
