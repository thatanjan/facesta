import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Switch, Route, useLocation, Redirect } from 'react-router-dom'

// import DarkModeThemeProvider from 'themes/dark_light_mode'

import PrivateRoute from 'HOC/PrivateRoute'

const DarkModeThemeProvider = lazy(() => import('themes/DarkTheme'))

const AppHeader = lazy(() => import('components/AppHeader/AppHeader'))

const UserProfilePage = lazy(() =>
	import('pages/UserProfilePage/UserProfilePage')
)

const HomePage = lazy(() => {
	return import('pages/HomePage/HomePage')
})

const PrivateRoutes = ({ authenticated }) => {
	return (
		<>
			<Suspense fallback={<CircularProgress />}>
				<DarkModeThemeProvider>
					<PrivateRoute path='/' Component={AppHeader} />
					<Switch>
						<PrivateRoute exact path='/' Component={HomePage} />
						<PrivateRoute exact path='/profile/:user' Component={UserProfilePage} />

						{/* redirects to homepage if no route matches */}
						{authenticated && <Route render={() => <Redirect to='/' />} />}
					</Switch>
				</DarkModeThemeProvider>
			</Suspense>
		</>
	)
}

PrivateRoutes.propTypes = {
	authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	authenticated: isAuthenticated,
})

export default connect(mapStateToProps)(PrivateRoutes)
