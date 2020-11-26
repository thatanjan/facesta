import React, { Suspense, lazy, useState } from 'react'
import { connect } from 'react-redux'
import PageLayoutComponent from 'HOC/PageLayoutComponent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import DoneIcon from '@material-ui/icons/Done'
import { makeStyles } from '@material-ui/core/'
import EditIcon from '@material-ui/icons/Edit'

import { editProfile, doneEditingProfile } from 'redux/actions/profileAction'

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

// This button will follow any user
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

// This button will let the user to edit their profile
let EditButton = ({ editingProfile, editProfile }) => {
	return (
		<Button
			disabled={editingProfile}
			startIcon={<EditIcon />}
			onClick={editProfile}
		>
			Edit Profile
		</Button>
	)
}

const mapStateToProps = ({ profile }) => ({
	editingProfile: profile.editingProfile,
})

const mapDispatchToProps = dispatch => ({
	editProfile: () => dispatch(editProfile()),
	doneEditingProfile: () => dispatch(doneEditingProfile()),
})

EditButton = connect(mapStateToProps, mapDispatchToProps)(EditButton)

let DoneEditingButton = ({ doneEditingProfile }) => {
	return (
		<Button variant='contained' color='secondary' onClick={doneEditingProfile}>
			Done
		</Button>
	)
}

DoneEditingButton = connect(null, mapDispatchToProps)(DoneEditingButton)

let Content = ({ editingProfile, editProfile, doneEditingProfile }) => {
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

				{editingProfile && <DoneEditingButton onClick={doneEditingProfile} />}
			</Suspense>
		</>
	)
}

Content = connect(mapStateToProps, mapDispatchToProps)(Content)

const UserProfilePage = () => {
	return (
		<>
			<PageLayoutComponent Content={Content} />
		</>
	)
}

export default UserProfilePage
