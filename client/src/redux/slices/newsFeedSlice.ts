import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	mutateNewsFeed: false,
	mutateAllPost: false,
}
const slice = createSlice({
	name: 'newsfeed',
	initialState,
	reducers: {
		mutateNewsFeed: state => {
			state.mutateNewsFeed = !state.mutateNewsFeed
		},
		mutateAllPost: state => {
			state.mutateAllPost = !state.mutateAllPost
		},
	},
})

export const { mutateNewsFeed, mutateAllPost } = slice.actions

export default slice.reducer
