const INITIAL_STATE = {
	isAuthenticated: false,
	user: {},
}

export const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case '':
			return state

		default:
			return state
	}
}
