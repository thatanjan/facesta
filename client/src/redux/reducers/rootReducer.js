import { combineReducers } from 'redux'

import { authReducer } from 'redux/reducers/user/userReducer'

export default combineReducers({
	auth: authReducer,
})
