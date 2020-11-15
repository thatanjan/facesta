import React, { useState } from 'react'
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
	const { drawerStyle } = useStyles()

	return (
		<div className={drawerStyle}>
			<NavigationDrawerList toggleDrawer={toggleDrawer} list={listComponents} />
		</div>
	)
}

export const NavigationDrawer = ({ toggleDrawer, toggleState }) => {
	return (
		<>
			<SwipeableDrawer
				anchor='left'
				open={toggleState}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				<NavigationDrawerContainer toggleDrawer={toggleDrawer} />
			</SwipeableDrawer>
		</>
	)
}

export default NavigationDrawer
