import React, { useState, Suspense, lazy } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import SwitchButton from '@material-ui/core/Switch'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import TypoGraphy from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { DarkModeThemeProvider } from 'themes/dark_light_mode'

const Loader = () => <div> loading</div>

// lazy loaded components
// const LogInPage = Loadable({
// 	loader: () => import('pages/logInPage/logInPage'),
// 	loading: loader,
// })
//

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
	},
})
const useStyles = makeStyles({
	fullBodyBackground: {
		// background: 'black',
		borderRadius: '0',
		minHeight: '100vh',
	},
})

const AuthenticationPage = lazy(() =>
	import('pages/UserAuthenticationPages/UserAuthenticationPage')
)

const UserProfilePage = lazy(() =>
	import('pages/UserProfilePage/UserProfilePage')
)

const UserEditProfilePage = lazy(() => {
	return import('pages/UserEditProfilePage/userEditProfilePage')
})

const App = ({ authenticated, match, location }) => {
	console.log(location)

	const { fullBodyBackground } = useStyles()

	// const [darkMode, toggleDarkMode] = useState(true)
	return (
		<>
				<DarkModeThemeProvider> 
			{location.pathname !== '/authentication/login' &&
			location.pathname !== '/authentication/sign_up' ? (

					<Paper className={fullBodyBackground}>
						hello world this is
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
			) : null
		
			}
				</DarkModeThemeProvider>

	<Switch>
				<Route exact path='/authentication/:auth'>
					{/* cannot access user authentication route if a user is alerady login */}
					{authenticated ? (
						<Redirect to='/' />
					) : (
						<Suspense fallback={<div>Loading...</div>}>
							<AuthenticationPage />
						</Suspense>
					
					)}
				</Route>
			</Switch>
			<Paper><div>hello world</div></Paper>
		</>
	)
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	authenticated: isAuthenticated,
})



export default connect(mapStateToProps)(withRouter(App))
