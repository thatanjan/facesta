import { combineReducers } from 'redux'

import authReducer from 'redux/reducers/authentication/authenticationReducer'
import profileReducer from 'redux/reducers/profile/profileReducer'

export default combineReducers({
	auth: authReducer,
	profile: profileReducer,
})
