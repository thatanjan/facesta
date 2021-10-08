import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	mutateNewsFeed: false,
}
const slice = createSlice({
	name: 'newsfeed',
	initialState,
	reducers: {
		mutateNewsFeed: state => {
			state.mutateNewsFeed = true

			setTimeout(() => {
				state.mutateNewsFeed = false
			}, 0)
		},
	},
})

export const { mutateNewsFeed } = slice.actions

export default slice.reducer
