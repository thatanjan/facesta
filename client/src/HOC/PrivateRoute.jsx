import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// for authentication routes
const AuthRoute = ({ isAuthenticated, Component, ...rest }) => {
	if (isAuthenticated) {
		return <Redirect to='/' />
	}
	return <Route component={Component} {...rest} />
}

// for other routes
const PrivateRoute = ({ isAuthenticated, Component, ...rest }) => {
	if (isAuthenticated) {
		return <Route component={Component} {...rest} />
	}
	return <Redirect to='/authentication/login' />
}

AuthRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	Component: PropTypes.elementType.isRequired,
}

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	Component: PropTypes.elementType.isRequired,
}
const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	isAuthenticated,
})

export default connect(mapStateToProps)(PrivateRoute)
export const PrivateAuthRoute = connect(mapStateToProps)(AuthRoute)
