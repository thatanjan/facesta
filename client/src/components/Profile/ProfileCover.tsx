import React, { useState } from 'react'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles, Theme } from '@material-ui/core/styles'
import useGetPersonalData from 'hooks/useGetPersonalProfile'
import useGetProfilePicture from 'hooks/useGetProfilePictue'
import ImageUploadModal from 'components/Modals/ImageUploadModal'

import createRequest from 'utils/createRequest'

import { uploadProfilePicture } from 'graphql/mutations/userMutations'

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		maxWidth: '100%',
		position: 'relative',
		marginTop: theme.typography.pxToRem(20),
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
		position: 'relative',
		marginBottom: '5%',
		boxShadow: 'none',
	},
	editIconStyle: { marginLeft: '100%', transform: 'translate(-100%, -100%)' },
}))

export const ProfileCover = () => {
	const { container, media, editIconStyle } = useStyles()
	const { data, error } = useGetPersonalData('name bio')

	const { data: pictureData, error: pictureDataError } = useGetProfilePicture()

	const action = async (image: ArrayBuffer | string | null) => {}

	const [uploadModalOpen, setUploadModalOpen] = useState(false)

	const openUploadModal = () => setUploadModalOpen(true)

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const {
		getPersonalData: { name, bio },
	} = data

	return (
		<>
			<Paper elevation={0}>
				<Card className={container}>
					{!pictureData && <div>loading...</div>}
					{pictureDataError && <div>failed to load</div>}

					{pictureData && (
						<>
							<Image
								className={media}
								layout='responsive'
								height={720}
								width={1280}
								src={
									pictureData?.getProfilePicture?.imageID || '/images/woman_avatar.png'
								}
							/>
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
					)}

					<Typography variant='h3' align='center'>
						{name}
					</Typography>
					<Grid container>
						<Grid container item justify='center'>
							{bio ? (
								<Typography variant='h5'>{bio}</Typography>
							) : (
								<Button>Add Bio </Button>
							)}
						</Grid>
					</Grid>
					<Divider />
				</Card>
			</Paper>
		</>
	)
}

export default ProfileCover
