import React, { useState } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import NavigationDrawerList from 'components/Drawers/NavigationDrawerList'

export const NavigationDrawer = ({ toggleDrawer, toggleState }) => {
	console.log(toggleState)
	return (
		<>
			<SwipeableDrawer
				anchor='left'
				open={toggleState}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				<NavigationDrawerList />
			</SwipeableDrawer>
		</>
	)
}

export default NavigationDrawer
