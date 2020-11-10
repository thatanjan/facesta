import React, { Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

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
			{location.pathname !== '/authentication/login' &&
			location.pathname !== '/authentication/sign_up' ? (
				<Paper className={fullBodyBackground}>
					hello world this is a world
					<Switch>
						<Route exact path='/profile/:user'>
							{authenticated ? (
								<Suspense fallback={<div>Loading...</div>}>
									<UserProfilePage />
								</Suspense>
							) : (
								<Redirect to='/authentication/login' />
							)}
						</Route>

						<Route exact path='/profile/:user/edit_profile'>
							{authenticated ? (
								<Suspense fallback={<div>Loading...</div>}>
									<UserEditProfilePage />
								</Suspense>
							) : (
								<Redirect to='/authentication/login' />
							)}
						</Route>
					</Switch>
				</Paper>
			) : null}
		</>
	)
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	authenticated: isAuthenticated,
})

export default connect(mapStateToProps)(withRouter(PrivateRoutes))
