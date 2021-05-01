import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface InitialState {
	uploadModal: boolean
	previewLink: string
	previewModal: boolean
	file: ArrayBuffer | string | null
}

const initialState: InitialState = {
	uploadModal: false,
	previewLink: '',
	previewModal: false,
	file: null,
}

const profilePictureUploadSlice = createSlice({
	name: 'profilePictureUpload',
	initialState,
	reducers: {
		openUploadModal: state => {
			state.uploadModal = true
		},
		closeUploadModal: state => {
			state.uploadModal = false
		},
		openPreviewModal: (
			state,
			{ payload: previewLink }: PayloadAction<string>
		) => {
			state.previewLink = previewLink
			state.previewModal = true
		},
		closePreviewModal: state => {
			state.previewLink = ''
			state.previewModal = false
		},
	},
})

export const {
	openUploadModal,
	closeUploadModal,
	openPreviewModal,
	closePreviewModal,
} = profilePictureUploadSlice.actions

export default profilePictureUploadSlice.reducer
