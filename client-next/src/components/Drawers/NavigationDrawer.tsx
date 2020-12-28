import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'

import NavigationDrawerList from 'components/Drawers/NavigationDrawerList'

import DrawerContextProvider from 'context/drawerContext'
import { useDrawerState, useDrawerDispatch } from 'hooks/drawerHooks'

const useStyles = makeStyles({
	drawerStyle: {
		width: '70vw',
	},
})

const Drawer = () => {
	const { drawerStyle } = useStyles()

	const { isDrawerOpen } = useDrawerState()

	const [openDrawer, closeDrawer] = useDrawerDispatch()

	return (
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
	)
}

const NavigationDrawer = () => {
	return (
		<>
			<DrawerContextProvider>
				<Drawer />
			</DrawerContextProvider>
		</>
	)
}

export default NavigationDrawer
