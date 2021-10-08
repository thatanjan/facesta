import dynamic from 'next/dynamic'
import React, { MouseEvent } from 'react'
import { nanoid } from 'nanoid'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import UserAvatar from 'components/Avatars/UserAvatar'
import CircularLoader from 'components/Loaders/CircularLoader'
import MuiLink from 'components/Links/MuiLink'

import { toggleDrawer } from 'redux/slices/drawerSlice'
import { useUserID } from 'redux/hooks/stateHooks'
import { useAppSelector, useAppDispatch } from 'redux/hooks/hooks'

import { useGetPersonalData } from 'hooks/useGetProfileData'
import { screenSizeDrawer, FOLLOWERS, FOLLOWING } from 'variables/global'
import listComponents, { Components } from './NavigationDrawerListData'

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

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
	const ownUserID = useUserID()

	const dispatch = useAppDispatch()

	const { isOpen } = useAppSelector(state => state.drawer)

	const { data, error } = useGetPersonalData(ownUserID)

	const { iconStyle, logOutIconStyle, listItemTextStyle } = useStyles()

	if (error) return <SwrErrorAlert />
	if (!data) return <CircularLoader />

	const {
		getPersonalData: { name, profilePicture },
	} = data

	const itemClickHandler = (event: any, index: number) => {
		if (index === listComponents.length - 1) {
			return true
		}

		if (matches) return true

		if (!matches && isOpen) {
			dispatch(toggleDrawer())
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
								<UserAvatar
									alt={name}
									imageID={profilePicture}
									href={linkModifier(title, link)}
								/>
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
