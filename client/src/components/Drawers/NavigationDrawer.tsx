import React from 'react'
import dynamic from 'next/dynamic'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'

import CircularLoader from 'components/Loaders/CircularLoader'

import { useDrawerState, useDrawerDispatch } from 'hooks/drawerHooks'

const NavigationDrawerList = dynamic(
	() => import('components/Drawers/NavigationDrawerList'),
	{ loading: () => <CircularLoader /> }
)

const useStyles = makeStyles({
	drawerStyle: {
		width: '70vw',
	},
})

export const NavigationDrawer = () => {
	const { drawerStyle } = useStyles()

	const isDrawerOpen = useDrawerState()

	const [openDrawer, closeDrawer] = useDrawerDispatch()

	return (
		<>
			<SwipeableDrawer
				anchor='left'
				open={isDrawerOpen}
				onClose={closeDrawer}
				onOpen={openDrawer}
			>
				<div className={drawerStyle}>
					<NavigationDrawerList />{' '}
				</div>
			</SwipeableDrawer>
		</>
	)
}

export default NavigationDrawer
