import axios from 'axios'

import {
	GET_PROFILE,
	PROFILE_LOADING,
	EDIT_PROFILE,
	DONE_EDITING_PROFILE,
} from 'redux/actions/types'

export const setProfileLoading = () => ({
	type: PROFILE_LOADING,
})

export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading())

	axios
		.get('/api/profile')
		.then(({ data }) => {
			dispatch({
				type: GET_PROFILE,
				payload: data,
			})
		})
		.catch(() => ({
			type: GET_PROFILE,
			payload: {},
		}))
}

export const editProfile = () => ({
	type: EDIT_PROFILE,
})

export const doneEditingProfile = () => ({
	type: DONE_EDITING_PROFILE,
})
