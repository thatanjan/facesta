import React from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

import { editProfile } from 'redux/actions/profileAction'

// This button will let the user to edit their profile
let EditButton = ({ editProfile }) => {
	const { pathname } = useLocation()

	return (
		<Button
			component={Link}
			to={`${pathname}/edit_profile`}
			startIcon={<EditIcon />}
			onClick={editProfile}
		>
			Edit Profile
		</Button>
	)
}

const mapStateToProps = ({ profile }) => ({
	editingProfile: profile.editingProfile,
})

const mapDispatchToProps = dispatch => ({
	editProfile: () => dispatch(editProfile()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditButton)
