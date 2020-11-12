import React from 'react'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import PrivateRoutes from 'routes/PrivateRoutes'
import PrivateAuthRoutes from 'routes/PrivateAuthRoutes'

const App = () => {
	return (
		<>
			<PrivateRoutes />
			<PrivateAuthRoutes />
		</>
	)
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	authenticated: isAuthenticated,
})

export default connect(mapStateToProps)(App)
