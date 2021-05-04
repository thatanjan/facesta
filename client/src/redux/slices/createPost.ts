import createRequest from 'utils/createRequest'
import { createPost } from 'graphql/mutations/postMutations'
import { RootState } from 'redux/store'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Props as AlertProps } from 'components/Alerts/Alert'

import { Values as InputValues } from 'components/Post/CreatePost/CreatePostModal'

export type Base64 = ArrayBuffer | string | null

export interface InitialState {
	uploadModal: boolean
	previewLink: string
	previewModal: boolean
	file: Base64
	uploading: boolean
	successful: boolean
	failed: boolean
	alertProps: AlertProps | {}
	postModal: boolean
}

const initialState: InitialState = {
	uploadModal: false,
	previewLink: '',
	previewModal: false,
	file: null,
	uploading: false,
	successful: false,
	failed: false,
	alertProps: {
		severity: 'info',
		message: '',
		checked: false,
	},
	postModal: false,
}

export const uploadPost = createAsyncThunk(
	'createPost/uploadPostStatus',
	async ({ postHeader, postText }: InputValues, { getState }) => {
		const state = getState() as RootState

		const { file: image } = state.createPost

		return createRequest({
			key: createPost,
			values: { image, markdown: false, headline: postHeader, text: postText },
		})
	}
)

const createPostSlice = createSlice({
	name: 'createPost',
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
			state.previewModal = false
		},
		makeBase64Image: (state, { payload: file }: PayloadAction<Base64>) => {
			state.file = file
		},
		resetState: () => initialState,
		openPostModal: state => {
			state.postModal = true
		},
	},
	extraReducers: builder => {
		builder
			.addCase(uploadPost.pending, state => {
				state.uploading = true

				state.alertProps = {
					severity: 'info',
					message: 'Post is uploading',
					checked: true,
				}
			})

			.addCase(uploadPost.fulfilled, (state, { payload }) => {
				state.uploading = false
				state.successful = true

				const data = payload.createPost

				if (data.message) {
					state.alertProps = {
						severity: 'success',
						message: data.message,
						checked: true,
					}
				}

				if (data.errorMessage) {
					state.alertProps = {
						severity: 'error',
						message: data.errorMessage,
						checked: true,
					}
				}
			})
			.addCase(uploadPost.rejected, state => {
				state.uploading = false
				state.failed = true

				state.alertProps = {
					severity: 'error',
					message: 'Something went wrong. Please try again',
					checked: true,
				}
			})
	},
})

export const {
	openUploadModal,
	closeUploadModal,
	openPreviewModal,
	closePreviewModal,
	makeBase64Image,
	resetState,
	openPostModal,
} = createPostSlice.actions

export default createPostSlice.reducer
