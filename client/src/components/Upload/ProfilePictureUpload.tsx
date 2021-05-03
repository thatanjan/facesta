import React, { useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'

import ImageUploadModal from 'components/Modals/ImageUploadModal'
import ImagePreview from 'components/Images/ImagePreview'

import UploadAlert, { Props as AlertProps } from 'components/Alerts/Alert'

import { useAppSelector, useAppDispatch } from 'redux/hooks/hooks'
import {
	openUploadModal,
	closePreviewModal,
	uploadFile,
	closeUploadModal,
	makeBase64Image,
	openPreviewModal,
	resetState,
} from 'redux/slices/profilePictureUpload'

const useStyles = makeStyles(() => ({
	editIconStyle: { marginLeft: '100%', transform: 'translate(-100%, -100%)' },
}))

export type Base64 = ArrayBuffer | string | null

const ProfilePictureUpload = () => {
	const dispatch = useAppDispatch()

	const {
		uploading,
		alertProps,
		uploadModal,
		previewModal,
		previewLink,
		successful,
		failed,
	} = useAppSelector(state => state.profilePictureUpload)

	useEffect(() => {
		if (successful || failed) {
			setTimeout(() => {
				dispatch(resetState())
			}, 3000)
		}
	}, [successful, failed])

	const { editIconStyle } = useStyles()

	const closeReset = () => {
		dispatch(resetState())
	}

	const uploadModalProps = {
		closeModal: () => dispatch(closeUploadModal()),
		uploadModal,
		makeImage: (base64: Base64) => dispatch(makeBase64Image(base64)),
		openPreviewModal: (link: string) => dispatch(openPreviewModal(link)),
		closeReset,
	}

	const handleDiscard = () => {
		dispatch(closePreviewModal())
		dispatch(openUploadModal())
	}

	const handleAccept = () => {
		dispatch(uploadFile())
		dispatch(closePreviewModal())
	}

	const imagePreviewProps = {
		previewLink,
		previewModal,
		handleDiscard,
		handleAccept,
	}

	return (
		<>
			<IconButton
				onClick={() => dispatch(openUploadModal())}
				className={editIconStyle}
			>
				<EditIcon />
			</IconButton>

			{uploadModal && <ImageUploadModal {...uploadModalProps} />}

			{previewModal && <ImagePreview {...imagePreviewProps} />}

			{(uploading || successful || failed) && (
				<UploadAlert {...(alertProps as AlertProps)} />
			)}
		</>
	)
}

export default ProfilePictureUpload
