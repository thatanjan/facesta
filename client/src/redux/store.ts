import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import createPostReducer from 'redux/slices/createPost'
import userReducer from 'redux/slices/userSlice'
import profilePictureUploadReducer from './slices/profilePictureUpload'
import drawerReducer from './slices/drawerSlice'
import profileReducer from './slices/profileSlice'

const store = configureStore({
	reducer: {
		user: userReducer,
		profilePictureUpload: profilePictureUploadReducer,
		createPost: createPostReducer,
		drawer: drawerReducer,
		profile: profileReducer,
	},
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
