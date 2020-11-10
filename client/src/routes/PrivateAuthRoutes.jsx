import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const AuthenticationPage = lazy(() =>
	import('pages/UserAuthenticationPages/UserAuthenticationPage')
)

export const PrivateAuthRoutes = ({ authenticated }) => {
	return (
		<>
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
		</>
	)
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	authenticated: isAuthenticated,
})

export default connect(mapStateToProps)(PrivateAuthRoutes)
