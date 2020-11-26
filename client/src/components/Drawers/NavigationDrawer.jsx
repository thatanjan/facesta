import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'

import NavigationDrawerList from 'components/Drawers/NavigationDrawerList'

// actions
import { openDrawer, closeDrawer } from 'redux/actions/drawerActions'

const useStyles = makeStyles({
	drawerStyle: {
		width: '70vw',
	},
})

export const NavigationDrawer = ({ isDrawerOpen, closeDrawer, openDrawer }) => {
	const { drawerStyle } = useStyles()
	return (
		<>
			<SwipeableDrawer
				anchor='left'
				open={isDrawerOpen}
				onClose={closeDrawer}
				onOpen={openDrawer}
			>
				<div className={drawerStyle}>
					<NavigationDrawerList />
				</div>
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
