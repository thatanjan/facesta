import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

export const userEditProfilePage = props => {
	console.log(props)
	return <div></div>
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(userEditProfilePage))
