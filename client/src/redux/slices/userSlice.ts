/* eslint-disable no-param-reassign  */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserIDState = string

export interface UserState {
	id: UserIDState
	isLoggedIn: boolean
}

const initialState: UserState = {
	id: '',
	isLoggedIn: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }: PayloadAction<UserIDState>) => {
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
