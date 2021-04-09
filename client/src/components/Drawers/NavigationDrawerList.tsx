import React, { MouseEvent } from 'react'
import { nanoid } from 'nanoid'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Avatar from '@material-ui/core/Avatar'

import MuiLink from 'components/Links/MuiLink'
import { useDrawerState, useDrawerDispatch } from 'hooks/drawerHooks'
import { useOwnUserId } from 'hooks/userhooks'
import { useGetPersonalData } from 'hooks/useGetProfileData'
import {
	screenSizeDrawer,
	FOLLOWERS,
	FOLLOWING,
	cloudinaryURL,
} from 'variables/global'
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
	const matches = useMediaQuery(screenSizeDrawer)
	const ownUserID = useOwnUserId()

	const { data, error } = useGetPersonalData(ownUserID)

	const { iconStyle, logOutIconStyle, listItemTextStyle } = useStyles()

	const isDrawerOpen = useDrawerState()
	const drawerDispatch = useDrawerDispatch()

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const {
		getPersonalData: { name, profilePicture },
	} = data

	const itemClickHandler = (event: any, index: number) => {
		if (index === listComponents.length - 1) {
			return true
		}

		if (matches) return true

		if (!matches && isDrawerOpen) {
			const [openDrawer, closeDrawer] = drawerDispatch

			isDrawerOpen ? closeDrawer() : openDrawer()
			return true
		}

		event.preventDefault()
		return false
	}

	const linkModifier = (title: string, link: string) => {
		const baseUrl = (num: number) => `/profile/${ownUserID}?show=${num}`

		switch (title) {
			case FOLLOWERS:
				return baseUrl(1)
			case FOLLOWING:
				return baseUrl(2)

			default:
				return link
		}
	}
	return (
		<List component='nav'>
			{listComponents.map(
				({ Component, title, link }: Components, index: number) => (
					<MuiLink
						href={linkModifier(title, link)}
						MuiComponent={ListItem}
						button
						key={nanoid()}
						onClick={(event: MouseEvent) => itemClickHandler(event, index)}
					>
						<ListItemIcon>
							{index === 1 ? (
								<Avatar alt={name} src={cloudinaryURL(profilePicture)} />
							) : (
								<Component
									className={title === 'log out' ? logOutIconStyle : iconStyle}
									color='secondary'
								/>
							)}
						</ListItemIcon>
						<ListItemText
							className={listItemTextStyle}
							primary={index === 1 ? name : title}
						/>
					</MuiLink>
				)
			)}
		</List>
	)
}

export default NavigationDrawerList
