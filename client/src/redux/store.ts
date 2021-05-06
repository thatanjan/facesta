import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import createPostReducer from 'redux/slices/createPost'
import userReducer from 'redux/slices/userSlice'
import profilePictureUploadReducer from './slices/profilePictureUpload'
import drawerReducer from './slices/drawerSlice'

const store = configureStore({
	reducer: {
		user: userReducer,
		profilePictureUpload: profilePictureUploadReducer,
		createPost: createPostReducer,
		drawer: drawerReducer,
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
