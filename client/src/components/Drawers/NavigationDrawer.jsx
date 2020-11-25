import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import NavigationDrawerList from 'components/Drawers/NavigationDrawerList'

// actions
import { openDrawer, closeDrawer } from 'redux/actions/drawerActions'

export const NavigationDrawer = ({ isDrawerOpen, closeDrawer, openDrawer }) => {
	return (
		<>
			<SwipeableDrawer
				anchor='left'
				open={isDrawerOpen}
				onClose={closeDrawer}
				onOpen={openDrawer}
			>
				<NavigationDrawerList />
			</SwipeableDrawer>
		</>
	)
}

const mapStateToProps = state => ({
	isDrawerOpen: state.drawer.isDrawerOpen,
})

const mapDispatchToProps = dispatch => ({
	openDrawer: () => dispatch(openDrawer),
	closeDrawer: () => dispatch(closeDrawer),
})

NavigationDrawer.propTypes = {
	openDrawer: PropTypes.func.isRequired,
	closeDrawer: PropTypes.func.isRequired,
	isDrawerOpen: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
