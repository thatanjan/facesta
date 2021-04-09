import React, { useState, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'

import ImageUploadModal, {
	NullOrBooleanType,
} from 'components/Modals/ImageUploadModal'
import ImagePreview from 'components/Images/ImagePreview'

import makeBase64 from 'utils/makeBase64Image'
import UploadAlert, { Props as AlertProps } from 'components/Alerts/Alert'

import { CustomFile } from 'interfaces/upload'

const useStyles = makeStyles(() => ({
	editIconStyle: { marginLeft: '100%', transform: 'translate(-100%, -100%)' },
}))

export type Base64 = ArrayBuffer | string | null

type Action = 'uploadProfilePicture' | 'createPost'

export interface Props {
	action: (base64: Base64) => any
	mutate: () => Promise<any>
}

const ProfilePictureUpload = ({ action, mutate }: Props) => {
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

	const { editIconStyle } = useStyles()

	const openUploadModal = () => setUploadModalOpen(true)

	const uploadModalProps = {
		setFile,
		uploadModalOpen,
		setUploadModalOpen,
		setApproved,
	}

	useEffect(() => {
		const { valid, previewLink: link } = file as CustomFile

		if (valid) {
			setPreviewLink(link)
			setShowPreview(true)
		}
	}, [file])

	useEffect(() => {
		if (approved) {
			setShowPreview(false)
			setLoading(true)
			makeBase64(file as CustomFile, setBase64)
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
					const message = res[UPLOAD_PROFILE_PICTURE]?.message
					const errorMessage = res[UPLOAD_PROFILE_PICTURE]?.errorMessage

					setLoading(false)

					if (message) {
						setUploadAlertProps(prev => ({
							...prev,
							message,
							severity: 'success',
						}))
						setSuccess(true)
						mutate()
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
	}, [success])

	useEffect(() => {
		if (showAlert) {
			setSuccess(null)
			setTimeout(() => {
				setShowAlert(false)
				setShowAlert(null)
			}, 3000)
		}
	}, [showAlert])

	useEffect(() => {
		if (loading) {
			setUploadAlertProps(prev => ({
				...prev,
				severity: 'info',
				message: 'Profile picture is uploading',
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
