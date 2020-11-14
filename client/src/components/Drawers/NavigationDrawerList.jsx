import React from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import HomeIcon from '@material-ui/icons/Home'

import SvgSupport from 'HOC/svgSupport'

import { ReactComponent as FriendRequests } from 'assets/svgs/friendRequest.svg'

// action
import { logoutUser } from 'redux/actions/authActions'

const FriendRequestsIcon = SvgSupport(FriendRequests)

export const convertSpaceToDash = text => {
	if (typeof text === 'string') {
		return text.replace(/\s/g, '-')
	}
}

const useStyles = makeStyles({
	drawerStyle: {
		width: '70vw',
		paddingTop: '1rem',
	},
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

const listComponents = [
	{
		title: 'Home',
		Component: HomeIcon,
		link: '/',
	},
	{
		title: 'user',
		Component: AccountCircleIcon,
		link: '/profile',
	},
	{
		title: 'Trending',
		Component: TrendingUpIcon,
		link: '/trending',
	},
	{
		title: 'Videos',
		Component: VideoLibraryIcon,
		link: '/videos',
	},
	{
		title: 'Friend Requests',
		Component: FriendRequestsIcon,
		link: '/friend-request',
	},
	{
		title: 'Settings',
		Component: SettingsIcon,
		link: '/settings',
	},
	{
		title: 'Log Out',
		Component: ExitToAppIcon,
		link: '',
	},
]

const NavigationList = ({ logoutUser, name }) => {
	const {
		drawerStyle,
		iconStyle,
		logOutIconStyle,
		listItemTextStyle,
	} = useStyles()

	const logoutHandeler = event => {
		event.preventDefault()

		logoutUser()
	}

	return (
		<div className={drawerStyle}>
			<List component='nav'>
				{listComponents.map(({ Component, title, link }, index) => (
					<ListItem
						button
						key={nanoid()}
						component={RouterLink}
						to={index === 1 ? `${link}/${convertSpaceToDash(name)}` : link}
						onClick={index === listComponents.length - 1 ? logoutHandeler : null}
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
				))}
			</List>
		</div>
	)
}

const mapStateToProps = state => ({ name: state.auth.user.name })

const mapDispatchToProps = { logoutUser }

export default connect(mapStateToProps, mapDispatchToProps)(NavigationList)
