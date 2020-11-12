import React, { Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import DarkModeThemeProvider from 'themes/dark_light_mode'
import AppBar from 'components/AppHeader/AppHeader'

const UserProfilePage = lazy(() =>
	import('pages/UserProfilePage/UserProfilePage')
)

const UserEditProfilePage = lazy(() => {
	return import('pages/UserEditProfilePage/userEditProfilePage')
})

const useStyles = makeStyles({
	fullBodyBackground: {
		// background: theme.palette.background.paper,
		borderRadius: '0',
		minHeight: '100vh',
	},
})

const PrivateRoutes = ({ authenticated, location }) => {
	const { fullBodyBackground } = useStyles()
	return (
		<>
			{/* if authenticated and not any auth pages then show AppBar */}
			{authenticated &&
				location.pathname !== '/authentication/login' &&
				location.pathname !== '/authentication/sign_up' && (
					<DarkModeThemeProvider>
						<AppBar />
					</DarkModeThemeProvider>
				)}

			{!authenticated &&
				location.pathname !== '/authentication/login' &&
				location.pathname !== '/authentication/sign_up' && (
					<DarkModeThemeProvider>
						<Redirect to='/authentication/login' />
					</DarkModeThemeProvider>
				)}
		</>
	)
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	authenticated: isAuthenticated,
})

export default connect(mapStateToProps)(withRouter(PrivateRoutes))
