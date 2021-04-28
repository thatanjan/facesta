import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import userReducer from 'redux/slices/userSlice'
import hasSeenReducer from 'redux/slices/hasSeenSlice'
import newsFeedReducer from 'redux/slices/newsFeedSlice'

const store = configureStore({
	reducer: {
		user: userReducer,
		hasSeen: hasSeenReducer,
		newsFeed: newsFeedReducer,
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
