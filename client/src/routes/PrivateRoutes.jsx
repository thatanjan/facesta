import React, { Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useLocation, Redirect } from 'react-router-dom'

// import DarkModeThemeProvider from 'themes/dark_light_mode'

import PrivateRoute from 'HOC/PrivateRoute'

const DarkModeThemeProvider = lazy(() => import('themes/DarkTheme'))

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

const PrivateRoutes = ({ authenticated }) => {
	const location = useLocation()
	console.log(location)
	return (
		<>
			<Suspense fallback={() => <div children='hello world' />}>
				<DarkModeThemeProvider>
					<PrivateRoute path='/' component={AppHeader} />
					<Switch>
						<PrivateRoute exact path='/' component={HomePage} />
						<PrivateRoute exact path='/profile/:user' component={UserProfilePage} />
						<PrivateRoute
							exact
							path='/profile/:user/edit-profile'
							component={UserEditProfilePage}
						/>

						{/* redirects to homepage if no route matches */}
						{authenticated && <Route render={() => <Redirect to='/' />} />}
					</Switch>
				</DarkModeThemeProvider>
			</Suspense>
		</>
	)
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	authenticated: isAuthenticated,
})

export default connect(mapStateToProps)(PrivateRoutes)
