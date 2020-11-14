import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// for authentication routes
const AuthRoute = ({ isAuthenticated, Component, ...rest }) => {
	if (isAuthenticated) {
		return <Redirect to='/' />
	} else {
		return <Route component={Component} {...rest} />
	}
}

// for other routes
const PrivateRoute = ({ isAuthenticated, Component, ...rest }) => {
	if (isAuthenticated) {
		return <Route component={Component} {...rest} />
	} else {
		return <Redirect to='/authentication/login' />
	}
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	isAuthenticated,
})

export default connect(mapStateToProps)(PrivateRoute)
export const PrivateAuthRoute = connect(mapStateToProps)(AuthRoute)
