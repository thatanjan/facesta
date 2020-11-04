import { TEST_DISPATCH } from 'redux/actions/types'

const INITIAL_STATE = {
	isAuthenticated: false,
	user: {},
}

export const authReducer = (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case TEST_DISPATCH:
			return {
				...state,
				user: payload,
			}

		default:
			return state
	}
}
