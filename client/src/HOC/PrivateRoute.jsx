import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ isAuthenticated, Component, ...rest }) => {
	// console.log(isAuthenticated)
	if (isAuthenticated) {
		return <Route component={Component} {...rest} />
	} else {
		return <Redirect to='/authentication/login' />
	}
}

const AuthRoute = ({ isAuthenticated, Component, ...rest }) => {
	if (isAuthenticated) {
		return <Redirect to='/' />
	} else {
		return <Route component={Component} {...rest} />
	}
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	isAuthenticated,
})

export default connect(mapStateToProps)(PrivateRoute)
export const PrivateAuthRoute = connect(mapStateToProps)(AuthRoute)
