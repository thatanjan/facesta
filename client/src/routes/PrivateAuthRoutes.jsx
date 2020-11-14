import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { PrivateAuthRoute } from 'HOC/PrivateRoute'

const AuthenticationPage = lazy(() =>
	import('pages/UserAuthenticationPages/UserAuthenticationPage')
)

export const PrivateAuthRoutes = ({ authenticated }) => {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<PrivateAuthRoute
						exact
						path='/authentication/:auth'
						Component={AuthenticationPage}
					/>
				</Switch>
			</Suspense>
		</>
	)
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	authenticated: isAuthenticated,
})

export default connect(mapStateToProps)(PrivateAuthRoutes)
