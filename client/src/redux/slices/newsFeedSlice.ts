import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NewsFeedState {
	mutate: Function
}

export const newsFeedSlice = createSlice({
	name: 'newsFeed',
	initialState: {
		mutate: () => null,
	} as NewsFeedState,
	reducers: {
		makeMuateFunction: (state, { payload }: PayloadAction<Function>) => {
			state.mutate = payload
		},
	},
})

export const { makeMuateFunction } = newsFeedSlice.actions

export default newsFeedSlice.reducer
