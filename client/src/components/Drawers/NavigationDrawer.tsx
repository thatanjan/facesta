import React, { useEffect } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'

// import NavigationDrawerList from 'components/Drawers/NavigationDrawerList'

import { useDrawerState, useDrawerDispatch } from 'hooks/drawerHooks'

const useStyles = makeStyles({
	drawerStyle: {
		width: '70vw',
	},
})

export const NavigationDrawer = () => {
	const { drawerStyle } = useStyles()

	const { isDrawerOpen } = useDrawerState()

	const [openDrawer, closeDrawer] = useDrawerDispatch()

	return (
		<>
			<SwipeableDrawer
				anchor='left'
				open={isDrawerOpen}
				onClose={closeDrawer}
				onOpen={openDrawer}
			>
				<div className={drawerStyle}>{/* <NavigationDrawerList /> */}</div>
			</SwipeableDrawer>
		</>
	)
}

export default NavigationDrawer
