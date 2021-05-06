import React from 'react'
import dynamic from 'next/dynamic'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'

import CircularLoader from 'components/Loaders/CircularLoader'

import { useAppDispatch, useAppSelector } from 'redux/hooks/hooks'
import { toggleDrawer } from 'redux/slices/drawerSlice'

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

	const dispatch = useAppDispatch()
	const { isOpen } = useAppSelector(state => state.drawer)

	const handleToggle = () => {
		dispatch(toggleDrawer())

		return true
	}

	return (
		<>
			<SwipeableDrawer
				anchor='left'
				open={isOpen}
				onClose={handleToggle}
				onOpen={handleToggle}
			>
				<div className={drawerStyle}>
					<NavigationDrawerList />{' '}
				</div>
			</SwipeableDrawer>
		</>
	)
}

export default NavigationDrawer
