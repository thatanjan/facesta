import { GET_PROFILE, PROFILE_LOADING } from 'redux/actions/types'

const initialState = {
	profile: null,
	loading: false,
}

const profileReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case PROFILE_LOADING:
			return {
				...state,
				loading: true,
			}

		case GET_PROFILE:
			return {
				...state,
				profile: payload,
				loading: true,
			}

		default:
			return state
	}
}

export default profileReducer
