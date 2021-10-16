import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import { makeStyles, Theme } from '@material-ui/core/styles'

import ProfilePictureUpload from 'components/Upload/ProfilePictureUpload'

import CircularLoader from 'components/Loaders/CircularLoader'

import { useIsSelf, useProfileUserID } from 'redux/hooks/stateHooks'

import useGetPersonalData from 'hooks/useGetProfileData'

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		maxWidth: '100%',
		position: 'relative',
		marginTop: theme.typography.pxToRem(20),
	},
	profileNameStyle: {
		fontSize: '2rem',
		[theme.breakpoints.up('md')]: {
			fontSize: '3rem',
		},
	},
}))

export const ProfileCover = () => {
	const profileUserID = useProfileUserID()
	const { container, profileNameStyle } = useStyles()

	const isSelf = useIsSelf()
	const { data, error } = useGetPersonalData(profileUserID)

	if (!data) return <CircularLoader />
	if (error) return <SwrErrorAlert />

	const {
		getPersonalData: { name, bio, profilePicture },
	} = data

	const avatar = 'confession/profile/Please_add_a_profile_picture.jpg'

	return (
		<>
			<Paper elevation={0}>
				<Card className={container}>
					<Image
						layout='responsive'
						height={720}
						width={1280}
						objectFit='cover'
						src={profilePicture || avatar}
					/>

					{isSelf && <ProfilePictureUpload />}

					<Typography variant='h1' align='center' className={profileNameStyle}>
						{name}
					</Typography>
					<Grid container>
						<Grid container item justify='center'>
							{bio && (
								<Typography
									variant='h6'
									component='p'
									align='center'
									style={{ fontWeight: 300, padding: '.5rem 0' }}
								>
									{bio}
								</Typography>
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
