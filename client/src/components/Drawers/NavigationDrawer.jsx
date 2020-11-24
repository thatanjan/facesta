import React from 'react'
import PropTypes from 'prop-types'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'

import NavigationDrawerList from 'components/Drawers/NavigationDrawerList'

import listComponents from './NavigationDrawerListData'

const useStyles = makeStyles({
	drawerStyle: {
		width: '70vw',
		paddingTop: '1rem',
	},
})

const NavigationDrawerContainer = ({ toggleDrawer }) => {
	console.log(toggleDrawer)
	const { drawerStyle } = useStyles()

	return (
		<div className={drawerStyle}>
			<NavigationDrawerList toggleDrawer={toggleDrawer} list={listComponents} />
		</div>
	)
}

NavigationDrawerContainer.propTypes = {
	toggleDrawer: PropTypes.func.isRequired,
}

export const NavigationDrawer = ({ toggleDrawer, toggleButtonState }) => {
	return (
		<>
			<SwipeableDrawer
				anchor='left'
				open={toggleButtonState}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				<NavigationDrawerContainer toggleDrawer={toggleDrawer} />
			</SwipeableDrawer>
		</>
	)
}

NavigationDrawer.propTypes = {
	toggleDrawer: PropTypes.func.isRequired,
	toggleButtonState: PropTypes.bool.isRequired,
}

export default NavigationDrawer
