import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import PrivateRoutes from 'routes/PrivateRoutes'
import PrivateAuthRoutes from 'routes/PrivateAuthRoutes'

const App = () => {
	return (
		<>
			<Switch>
				<PrivateRoutes />
				<PrivateAuthRoutes />

				{/* <Route render={() => <div children='invalid route' />} /> */}
			</Switch>
		</>
	)
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	authenticated: isAuthenticated,
})

export default connect(mapStateToProps)(App)
