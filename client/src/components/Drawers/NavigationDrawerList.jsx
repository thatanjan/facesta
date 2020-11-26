import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// action
import { openDrawer, closeDrawer } from 'redux/actions/drawerActions'
import { logoutUser as logoutUserAction } from 'redux/actions/authActions'

import listComponents from './NavigationDrawerListData'

export const convertSpaceToDash = text => {
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

const NavigationDrawerList = ({
	name,
	logoutUser,
	isDrawerOpen,
	openDrawer,
	closeDrawer,
}) => {
	const { iconStyle, logOutIconStyle, listItemTextStyle } = useStyles()

	const itemClickHandler = (event, index) => {
		if (index === listComponents.length - 1) {
			event.preventDefault()
			logoutUser()
		}

		isDrawerOpen ? closeDrawer() : openDrawer()
	}

	return (
		<List component='nav'>
			{listComponents.map(({ Component, title, link }, index) => (
				<ListItem
					button
					key={nanoid()}
					component={RouterLink}
					to={index === 1 ? `${link}/${convertSpaceToDash(name)}` : link}
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
			))}
		</List>
	)
}

NavigationDrawerList.propTypes = {
	name: PropTypes.string.isRequired,
	logoutUser: PropTypes.func.isRequired,
	openDrawer: PropTypes.func.isRequired,
	closeDrawer: PropTypes.func.isRequired,
	isDrawerOpen: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
	name: state.auth.user.name,
	isDrawerOpen: state.drawer.isDrawerOpen,
})

const mapDispatchToProps = dispatch => ({
	logoutUser: () => dispatch(logoutUserAction()),
	closeDrawer: () => dispatch(closeDrawer),
	openDrawer: () => dispatch(openDrawer),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavigationDrawerList)
