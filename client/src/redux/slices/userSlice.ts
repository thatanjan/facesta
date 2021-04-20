/* eslint-disable no-param-reassign  */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
	id: string
	isLoggedIn: boolean
}

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		id: '',
		isLoggedIn: false,
	},
	reducers: {
		login: (state, { payload }: PayloadAction<string>) => {
			state.id = payload
			state.isLoggedIn = true
		},
		logout: state => {
			state.id = ''
			state.isLoggedIn = false
		},
	},
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
