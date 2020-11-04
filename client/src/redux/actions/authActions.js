import { TEST_DISPATCH } from 'redux/actions/types'

export const registerUser = (userData) => ({
	type: TEST_DISPATCH,
	payload: userData,
})
