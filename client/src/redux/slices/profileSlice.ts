import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface InitialState {
	profileUserID: string
	isSelf: boolean
}

const initialState: InitialState = {
	profileUserID: '',
	isSelf: false,
}

export const profileSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addProfileUser: (
			state,
			{ payload: { profileUserID, isSelf } }: PayloadAction<InitialState>
		) => {
			state.profileUserID = profileUserID
			state.isSelf = isSelf
		},
		removeProfileUser: () => initialState,
	},
})

export const { addProfileUser, removeProfileUser } = profileSlice.actions

export default profileSlice.reducer
