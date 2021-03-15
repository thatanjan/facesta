import React, { useState, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import { mutate } from 'swr'

import ImageUploadModal, {
	ApprovedType,
} from 'components/Modals/ImageUploadModal'
import ImagePreview from 'components/Images/ImagePreview'
import LoadingModal from 'components/Modals/LoadingModal'

import { useProfileUserID } from 'hooks/profileContextHooks'
import createRequest from 'utils/createRequest'
import { getProfilePicture } from 'graphql/queries/profileQueries'
import { uploadProfilePicture } from 'graphql/mutations/userMutations'

import { CustomFile } from 'interfaces/upload'

const useStyles = makeStyles(() => ({
	editIconStyle: { marginLeft: '100%', transform: 'translate(-100%, -100%)' },
}))

const ProfilePictureUpload = () => {
	const [file, setFile] = useState<CustomFile | {}>({})
	const [approved, setApproved] = useState<ApprovedType>(null)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [uploadModalOpen, setUploadModalOpen] = useState(false)
	const [showPreview, setShowPreview] = useState(false)
	const [previewLink, setPreviewLink] = useState('')

	const { editIconStyle } = useStyles()

	const uploadModalProps = {
		setFile,
		uploadModalOpen,
		setUploadModalOpen,
		setApproved,
	}

	const profileUserID = useProfileUserID()

	const openUploadModal = () => setUploadModalOpen(true)

	const action = async (image: ArrayBuffer | string | null) => {
		const res = await createRequest({
			key: uploadProfilePicture,
			values: { image },
		})

		if (res?.uploadProfilePicture.message) {
			mutate([getProfilePicture, profileUserID])
		}
	}

	useEffect(() => {
		const { valid, previewLink: link } = file as CustomFile

		if (valid) {
			setPreviewLink(link)
			setShowPreview(true)
		}

		return () => console.log('unmounted')
	}, [file])

	useEffect(() => {
		if (approved) {
			setLoading(true)
			setTimeout(() => {
				setLoading(false)
			}, 2000)
		}

		if (approved === false) {
			setShowPreview(false)
			setUploadModalOpen(true)
		}
	}, [approved])

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
		</>
	)
}

export default ProfilePictureUpload
