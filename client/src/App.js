import React from 'react'
import { connect } from 'react-redux'

import DarkModeThemeProvider from 'themes/dark_light_mode'

import PrivateRoutes from 'routes/PrivateRoutes'
import PrivateAuthRoutes from 'routes/PrivateAuthRoutes'
import AppBar from 'components/AppHeader/AppHeader'

const App = () => {
	return (
		<>
			<AppBar />
			<DarkModeThemeProvider>
				<PrivateRoutes />
			</DarkModeThemeProvider>

			<PrivateAuthRoutes />
		</>
	)
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	authenticated: isAuthenticated,
})

export default connect(mapStateToProps)(App)
