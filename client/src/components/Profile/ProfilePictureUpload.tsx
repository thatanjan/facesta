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

import { useProfileUserID } from 'hooks/profileContextHooks'
import createRequest from 'utils/createRequest'
import makeBase64 from 'utils/makeBase64Image'
import { getProfilePicture } from 'graphql/queries/profileQueries'
import { uploadProfilePicture } from 'graphql/mutations/userMutations'
import UploadAlert, { Props as AlertProps } from 'components/Alerts/UploadAlert'

import { CustomFile } from 'interfaces/upload'

const useStyles = makeStyles(() => ({
	editIconStyle: { marginLeft: '100%', transform: 'translate(-100%, -100%)' },
}))

type Base64 = ArrayBuffer | string | null

const ProfilePictureUpload = () => {
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

	const uploadModalProps = {
		setFile,
		uploadModalOpen,
		setUploadModalOpen,
		setApproved,
	}

	const profileUserID = useProfileUserID()

	const openUploadModal = () => setUploadModalOpen(true)

	const action = async (image: Base64) => {
		const res = await createRequest({
			key: uploadProfilePicture,
			values: { image },
		})

		return res
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
					setLoading(false)

					if (res?.uploadProfilePicture.message) {
						setUploadAlertProps(prev => ({
							...prev,
							message: res?.uploadProfilePicture.message,
							severity: 'success',
						}))
						setSuccess(true)
						mutate([getProfilePicture, profileUserID])
					}

					if (res?.uploadProfilePicture.errorMessage) {
						setUploadAlertProps(prev => ({
							...prev,
							message: res?.uploadProfilePicture.errorMessage,
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
