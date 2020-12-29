import React from 'react'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { useDrawerState, useDrawerDispatch } from 'hooks/drawerHooks'
import useGetUser, { useSetUser } from 'hooks/userhooks'
import logout from 'utils/logout'
import listComponents, { Components } from './NavigationDrawerListData'

export const convertSpaceToDash = (text: string): string | boolean => {
	if (typeof text === 'string') {
		return text.replace(/\s/g, '-')
	}
	return false
}

const useStyles = makeStyles({
	iconStyle: {
		fontSize: '2em',
	},
	logOutIconStyle: {
		transform: 'rotatey(180deg)',
		fontSize: '2em',
	},
	listItemTextStyle: {
		textTransform: 'capitalize',
	},
})

const NavigationDrawerList = () => {
	const { iconStyle, logOutIconStyle, listItemTextStyle } = useStyles()

	const drawerState = useDrawerState()
	const drawerDispatch = useDrawerDispatch()

	const setUser = useSetUser()
	const { name } = useGetUser()
	const router = useRouter()

	const itemClickHandler = (event: any, index: number) => {
		event.preventDefault()
		if (index === listComponents.length - 1) {
			logout(setUser, router)
			return true
		}

		if (drawerState) {
			const { isDrawerOpen } = drawerState
			const [openDrawer, closeDrawer] = drawerDispatch

			isDrawerOpen ? closeDrawer() : openDrawer()
			return true
		}

		return false
	}

	return (
		<List component='nav'>
			{listComponents.map(
				({ Component, title, link }: Components, index: number) => (
					<ListItem
						button
						key={nanoid()}
						onClick={event => itemClickHandler(event, index)}
					>
						<ListItemIcon>
							<Component
								className={title === 'log out' ? logOutIconStyle : iconStyle}
								color='secondary'
							/>
						</ListItemIcon>

						<ListItemText
							className={listItemTextStyle}
							primary={index === 1 ? name : title}
						/>
					</ListItem>
				)
			)}
		</List>
	)
}

export default NavigationDrawerList

// to={index === 1 ? `${link}/${convertSpaceToDash(name)}` : link}
