import React, { useState } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'

import NavigationDrawerList from 'components/Drawers/NavigationDrawerList'

export const NavigationDrawer = ({ toggleDrawer, toggleState }) => {
	return (
		<>
			<SwipeableDrawer
				anchor='left'
				open={toggleState}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				<NavigationDrawerList toggleDrawer={toggleDrawer} />
			</SwipeableDrawer>
		</>
	)
}

export default NavigationDrawer
