import { combineReducers } from 'redux'

import authReducer from 'redux/reducers/authentication/authenticationReducer'
import profileReducer from 'redux/reducers/profile/profileReducer'
import drawerReducer from 'redux/reducers/drawer/drawerReducer'

export default combineReducers({
	auth: authReducer,
	profile: profileReducer,
	drawer: drawerReducer,
})
