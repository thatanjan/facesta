import React, { useState, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import { mutate } from 'swr'

import ImageUploadModal, {
	NullOrBooleanType,
} from 'components/Modals/ImageUploadModal'
import ImagePreview from 'components/Images/ImagePreview'
import LoadingModal from 'components/Modals/LoadingModal'

import { useOwnUserId } from 'hooks/userhooks'
import makeBase64 from 'utils/makeBase64Image'
import { getProfilePicture } from 'graphql/queries/profileQueries'
import UploadAlert, { Props as AlertProps } from 'components/Alerts/UploadAlert'

import { CustomFile } from 'interfaces/upload'

const useStyles = makeStyles(() => ({
	editIconStyle: { marginLeft: '100%', transform: 'translate(-100%, -100%)' },
}))

export type Base64 = ArrayBuffer | string | null

export interface Props {
	action: (base64: Base64) => any
	type: 'uploadProfilePicture' | 'createPost'
	setPostPreviewLink?: (link: string) => void
	uploadingPost?: boolean
	setUploadingPost?: (bool: boolean) => void
	closePostModal?: () => void
}

const ProfilePictureUpload = ({
	action,
	type,
	setPostPreviewLink,
	uploadingPost,
	setUploadingPost,
	closePostModal,
}: Props) => {
	const [file, setFile] = useState<CustomFile | {}>({})
	const [base64, setBase64] = useState<Base64>('')
	const [approved, setApproved] = useState<NullOrBooleanType>(null)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState<NullOrBooleanType>(null)
	const [uploadModalOpen, setUploadModalOpen] = useState(false)
	const [showPreview, setShowPreview] = useState(false)
	const [previewLink, setPreviewLink] = useState('')
	const [showAlert, setShowAlert] = useState<NullOrBooleanType>(false)
	const [uploadAlertProps, setUploadAlertProps] = useState<AlertProps | {}>({
		checked: true,
	})

	const { editIconStyle } = useStyles()

	const openUploadModal = () => setUploadModalOpen(true)

	const uploadModalProps = {
		setFile,
		uploadModalOpen,
		setUploadModalOpen,
		setApproved,
	}

	const ownUserID = useOwnUserId()

	useEffect(() => {
		const { valid, previewLink: link } = file as CustomFile

		if (valid) {
			setPreviewLink(link)
			setShowPreview(true)
		}
	}, [file])

	useEffect(() => {
		if (approved) {
			if (type === 'createPost') {
				if (setPostPreviewLink) setPostPreviewLink(previewLink)
				setShowPreview(false)
			}
			if (type === 'uploadProfilePicture') {
				setShowPreview(false)
				setLoading(true)
				makeBase64(file as CustomFile, setBase64)
			}
		}

		if (approved === false) {
			setShowPreview(false)
			setUploadModalOpen(true)
		}
	}, [approved])

	useEffect(() => {
		if (base64) {
			;(async () => {
				const res = await action(base64)
				if (res) {
					setLoading(false)

					if (res[type].message) {
						setUploadAlertProps(prev => ({
							...prev,
							message: res[type].message,
							severity: 'success',
						}))
						setSuccess(true)
						mutate([getProfilePicture, ownUserID])
					}

					if (res[type].errorMessage) {
						setUploadAlertProps(prev => ({
							...prev,
							message: res[type].errorMessage,
							severity: 'error',
						}))

						setSuccess(false)
					}
				}
			})()
		}
	}, [base64])

	useEffect(() => {
		if (success || success === false) {
			setShowAlert(true)
		}
		if (uploadingPost && setUploadingPost) {
			setUploadingPost(false)
		}
	}, [success])

	useEffect(() => {
		if (showAlert) {
			setSuccess(null)
			setTimeout(() => {
				setShowAlert(false)
				if (closePostModal) closePostModal()
				setShowAlert(null)
			}, 3000)
		}
	}, [showAlert])

	useEffect(() => {
		if (uploadingPost) {
			makeBase64(file as CustomFile, setBase64)
			setLoading(true)
		}
	}, [uploadingPost])

	const imagePreviewProps = { previewLink, showPreview, setApproved }
	const loadingModalProps = {
		open: loading,
		setOpen: setLoading,
		title: 'profile picture is uploading',
	}

	return (
		<>
			<IconButton onClick={openUploadModal} className={editIconStyle}>
				<EditIcon />
			</IconButton>

			{uploadModalOpen && <ImageUploadModal {...uploadModalProps} />}

			{showPreview && <ImagePreview {...imagePreviewProps} />}

			{loading && <LoadingModal {...loadingModalProps} />}

			{showAlert && <UploadAlert {...(uploadAlertProps as AlertProps)} />}
		</>
	)
}

export default ProfilePictureUpload
