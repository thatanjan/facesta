import React, { Suspense, lazy, useState } from 'react'
import PageLayoutComponent from 'HOC/PageLayoutComponent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import DoneIcon from '@material-ui/icons/Done'
import { makeStyles } from '@material-ui/core/'

const useStyles = makeStyles(({ spacing }) => ({
	buttonStyle: {
		padding: spacing(1),
	},

	buttonGridContainer: {
		margin: spacing(2, '0'),
	},
}))

const ProfileCover = lazy(() =>
	import('components/ImageComponent/ProfileCover')
)

const HorizontalMenu = lazy(() =>
	import('components/HorizontalMenu/HorizontalMenu')
)

const EditButton = lazy(() => import('./EditButton'))

const FollowButton = () => {
	const { buttonStyle } = useStyles()
	const [FollowState, setFollowState] = React.useState(false)

	return (
		<Button
			className={buttonStyle}
			color='secondary'
			variant='contained'
			onClick={() => setFollowState(!FollowState)}
			startIcon={FollowState && <DoneIcon />}
		>
			{FollowState ? 'Following' : 'Follow'}
		</Button>
	)
}

const Content = () => {
	const [owner, setOwner] = useState(true)
	const { buttonGridContainer } = useStyles()

	return (
		<>
			<Suspense fallback={<CircularProgress />}>
				<ProfileCover />
				<Grid container className={buttonGridContainer} justify='flex-end'>
					<Grid item>{owner ? <EditButton /> : <FollowButton />}</Grid>
				</Grid>
				<HorizontalMenu canEditProfile={owner} />
			</Suspense>
		</>
	)
}

const UserProfilePage = () => {
	return (
		<>
			<PageLayoutComponent Content={Content} />
		</>
	)
}

export default UserProfilePage
