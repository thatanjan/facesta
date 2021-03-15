import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import { mutate } from 'swr'

import ImageUploadModal from 'components/Modals/ImageUploadModal'
import LoadingModal from 'components/Modals/LoadingModal'

import { useProfileUserID } from 'hooks/profileContextHooks'
import createRequest from 'utils/createRequest'
import { getProfilePicture } from 'graphql/queries/profileQueries'
import { uploadProfilePicture } from 'graphql/mutations/userMutations'

const useStyles = makeStyles(() => ({
	editIconStyle: { marginLeft: '100%', transform: 'translate(-100%, -100%)' },
}))

const ProfilePictureUpload = () => {
	const { editIconStyle } = useStyles()

	const [uploadModalOpen, setUploadModalOpen] = useState(false)
	const [loadingModalOpen, setLoadingModalOpen] = useState(false)

	const profileUserID = useProfileUserID()

	const openUploadModal = () => setUploadModalOpen(true)

	const action = async (image: ArrayBuffer | string | null) => {
		setLoadingModalOpen(true)

		const res = await createRequest({
			key: uploadProfilePicture,
			values: { image },
		})

		if (res?.uploadProfilePicture.message) {
			mutate([getProfilePicture, profileUserID])
		}
	}

	return (
		<>
			<IconButton onClick={openUploadModal} className={editIconStyle}>
				<EditIcon />
			</IconButton>

			{uploadModalOpen && (
				<ImageUploadModal
					action={action}
					open={uploadModalOpen}
					setOpen={setUploadModalOpen}
					setLoadingModalOpen={setLoadingModalOpen}
				/>
			)}

			{loadingModalOpen && (
				<LoadingModal
					title='profile picture is uploading'
					open={loadingModalOpen}
					setOpen={setLoadingModalOpen}
				/>
			)}
		</>
	)
}

export default ProfilePictureUpload
