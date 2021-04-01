import React, { useState, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import { mutate } from 'swr'

import ImageUploadModal, {
	NullOrBooleanType,
} from 'components/Modals/ImageUploadModal'
import ImagePreview from 'components/Images/ImagePreview'

import { useOwnUserId } from 'hooks/userhooks'
import makeBase64 from 'utils/makeBase64Image'
import { getUser } from 'graphql/queries/profileQueries'
import UploadAlert, { Props as AlertProps } from 'components/Alerts/UploadAlert'

import { CustomFile } from 'interfaces/upload'

const useStyles = makeStyles(() => ({
	editIconStyle: { marginLeft: '100%', transform: 'translate(-100%, -100%)' },
}))

export type Base64 = ArrayBuffer | string | null

type Action = 'uploadProfilePicture' | 'createPost'

export interface Props {
	action: (base64: Base64) => any
	type: Action
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

	const UPLOAD_PROFILE_PICTURE: Action = 'uploadProfilePicture'
	const CREATE_POST: Action = 'createPost'

	const isCreatingPost = (actionType: Action) => actionType === CREATE_POST

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
			if (isCreatingPost(CREATE_POST)) {
				if (setPostPreviewLink) setPostPreviewLink(previewLink)
				setShowPreview(false)
			}
			if (!isCreatingPost(UPLOAD_PROFILE_PICTURE)) {
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
					const message = res[type]?.message
					const errorMessage = res[type]?.errorMessage

					setLoading(false)

					if (message) {
						setUploadAlertProps(prev => ({
							...prev,
							message,
							severity: 'success',
						}))
						setSuccess(true)

						if (!isCreatingPost(type)) {
							console.log('ran')
							mutate([getUser, ownUserID])
						}
					}

					if (errorMessage) {
						setUploadAlertProps(prev => ({
							...prev,
							message: errorMessage,
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

	useEffect(() => {
		if (loading) {
			setUploadAlertProps(prev => ({
				...prev,
				severity: 'info',
				message: isCreatingPost(type)
					? 'Post is uploading'
					: 'Profile picture is uploading',
			}))
		}
	}, [loading])

	const imagePreviewProps = { previewLink, showPreview, setApproved }

	return (
		<>
			<IconButton onClick={openUploadModal} className={editIconStyle}>
				<EditIcon />
			</IconButton>

			{uploadModalOpen && <ImageUploadModal {...uploadModalProps} />}

			{showPreview && <ImagePreview {...imagePreviewProps} />}

			{loading && <UploadAlert {...(uploadAlertProps as AlertProps)} />}

			{showAlert && <UploadAlert {...(uploadAlertProps as AlertProps)} />}
		</>
	)
}

export default ProfilePictureUpload
