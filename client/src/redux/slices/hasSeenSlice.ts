import { createSlice } from '@reduxjs/toolkit'

export interface HasSeenState {
	newsfeed: boolean
}

export const hasSeenSlice = createSlice({
	name: 'user',
	initialState: {
		newsfeed: false,
	},
	reducers: {
		newsFeedIsSeen: state => {
			state.newsfeed = true
		},
	},
})

export const { newsFeedIsSeen } = hasSeenSlice.actions

export default hasSeenSlice.reducer
