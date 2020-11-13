import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ isAuthenticated, ...props }) => {
	console.log(props)
	if (isAuthenticated) {
		return <Route {...props} />
	} else {
		return <Redirect to='/authentication/login' />
	}
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
	isAuthenticated,
})

export default connect(mapStateToProps)(PrivateRoute)
