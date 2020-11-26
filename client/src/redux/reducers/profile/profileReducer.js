import {
	GET_PROFILE,
	PROFILE_LOADING,
	EDIT_PROFILE,
	DONE_EDITING_PROFILE,
} from 'redux/actions/types'

const initialState = {
	profile: null,
	loading: false,
	editingProfile: false,
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

		case EDIT_PROFILE:
			return {
				...state,
				editingProfile: true,
			}

		case DONE_EDITING_PROFILE:
			return {
				...state,
				editingProfile: false,
			}

		default:
			return state
	}
}

export default profileReducer
