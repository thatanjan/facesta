import React, { Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import AppBar from 'components/AppHeader/AppHeader'

const UserProfilePage = lazy(() =>
	import('pages/UserProfilePage/UserProfilePage')
)

const UserEditProfilePage = lazy(() => {
	return import('pages/UserEditProfilePage/userEditProfilePage')
})

const useStyles = makeStyles(
	({
		palette: {
			background: { paper },
		},
	}) => {
		return {
			fullBodyBackground: {
				background: paper,
				borderRadius: '0',
				minHeight: '100vh',
			},
		}
	}
)

const PrivateRoutes = ({ authenticated, location }) => {
	const { fullBodyBackground } = useStyles()
	return (
		<>
			{authenticated &&
				location.pathname !== '/authentication/login' &&
				location.pathname !== '/authentication/sign_up' && <AppBar />}
			{/* {location.pathname === '/' && authenticated && <AppBar />} */}
			<Paper className={fullBodyBackground}>
				{!authenticated &&
					location.pathname !== '/authentication/login' &&
					location.pathname !== '/authentication/sign_up' && (
						<Redirect to='/authentication/login' />
					)}
			</Paper>
		</>
	)
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	authenticated: isAuthenticated,
})

export default connect(mapStateToProps)(withRouter(PrivateRoutes))
