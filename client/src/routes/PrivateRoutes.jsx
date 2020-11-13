import React, { Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import DarkModeThemeProvider from 'themes/dark_light_mode'

import PrivateRoute from 'HOC/PrivateRoute'

const AppHeader = lazy(() => import('components/AppHeader/AppHeader'))

const UserProfilePage = lazy(() =>
	import('pages/UserProfilePage/UserProfilePage')
)

const UserEditProfilePage = lazy(() => {
	return import('pages/UserEditProfilePage/userEditProfilePage')
})

const HomePage = lazy(() => {
	return import('pages/HomePage/HomePage')
})

const PrivateRoutes = ({ location }) => {
	return (
		<>
			<Suspense fallback={() => <div children='hello world' />}>
				<DarkModeThemeProvider>
					<Switch>
						<PrivateRoute path='/' component={AppHeader} />
						<PrivateRoute exact path='/' component={HomePage} />
						<PrivateRoute exact path='/profile/:user' component={UserProfilePage} />
						<PrivateRoute
							exact
							path='/profile/:user/edit-profile'
							component={UserEditProfilePage}
						/>

						{/* redirects to homepage if not route matches */}
						<Route exact path='*'>
							<Redirect to='/' />
						</Route>
					</Switch>
				</DarkModeThemeProvider>
			</Suspense>
		</>
	)
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	authenticated: isAuthenticated,
})

export default connect(mapStateToProps)(withRouter(PrivateRoutes))
