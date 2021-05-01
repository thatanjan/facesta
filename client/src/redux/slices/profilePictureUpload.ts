import createRequest from 'utils/createRequest'
import { uploadProfilePicture } from 'graphql/mutations/profileMutations'
import { RootState } from 'redux/store'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Base64 = ArrayBuffer | string | null

export interface InitialState {
	uploadModal: boolean
	previewLink: string
	previewModal: boolean
	file: Base64
	uploading: boolean
	successful: boolean
	failed: boolean
}

const initialState: InitialState = {
	uploadModal: false,
	previewLink: '',
	previewModal: false,
	file: null,
	uploading: false,
	successful: false,
	failed: false,
}

export const uploadFile = createAsyncThunk(
	'profilePictureUpload/uploadFileStatus',
	async (_, { getState }) => {
		const state = getState() as RootState

		const image = state.profilePictureUpload.file

		console.log(image)

		return createRequest({
			key: uploadProfilePicture,
			values: { image },
		})
	}
)

const profilePictureUploadSlice = createSlice({
	name: 'profilePictureUpload',
	initialState,
	reducers: {
		openUploadModal: state => {
			state.uploadModal = true
		},
		closeUploadModal: () => {
			return initialState
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
		makeBase64Image: (state, { payload: file }: PayloadAction<Base64>) => {
			state.file = file
		},
	},
	extraReducers: builder => {
		builder
			.addCase(uploadFile.pending, (state, action) => {
				console.log(action)
				state.uploading = true
			})
			.addCase(uploadFile.fulfilled, state => {
				state.uploading = false
				state.successful = true

				setTimeout(() => {
					state.successful = false
				}, 3000)
			})
			.addCase(uploadFile.rejected, state => {
				state.uploading = false
				state.failed = true

				setTimeout(() => {
					state.failed = false
				}, 3000)
			})
	},
})

export const {
	openUploadModal,
	closeUploadModal,
	openPreviewModal,
	closePreviewModal,
	makeBase64Image,
} = profilePictureUploadSlice.actions

export default profilePictureUploadSlice.reducer
