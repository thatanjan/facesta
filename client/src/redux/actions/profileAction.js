import axios from 'axios'

import { GET_PROFILE, PROFILE_LOADING } from 'redux/actions/types'

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
