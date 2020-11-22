import React, { Suspense, lazy } from 'react'
import { withRouter } from 'react-router-dom'
import PageLayoutComponent from 'HOC/PageLayoutComponent'
import CircularProgress from '@material-ui/core/CircularProgress'

const ProfileCover = lazy(() =>
	import('components/ImageComponent/ProfileCover')
)

const HorizontalMenu = lazy(() =>
	import('components/HorizontalMenu/HorizontalMenu')
)

const Content = () => {
	return (
		<>
			<Suspense fallback={<CircularProgress />}>
				<ProfileCover /> <HorizontalMenu />
			</Suspense>
		</>
	)
}

const UserProfilePage = props => {
	return (
		<>
			<PageLayoutComponent Content={Content} />{' '}
		</>
	)
}

export default withRouter(UserProfilePage)
