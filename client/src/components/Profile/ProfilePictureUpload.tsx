import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import { mutate } from 'swr'

import ImageUploadModal from 'components/Modals/ImageUploadModal'

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
				/>
			)}
		</>
	)
}

export default ProfilePictureUpload
