import { combineReducers } from 'redux'

import { userReducer } from 'redux/reducers/user/user_reducer'

export default combineReducers({
	user: userReducer,
})
