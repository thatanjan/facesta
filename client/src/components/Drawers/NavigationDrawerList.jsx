import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// action
import { logoutUser as logoutUserAction } from 'redux/actions/authActions'

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

const NavigationDrawerList = ({ list, name, logoutUser, toggleDrawer }) => {
	const { iconStyle, logOutIconStyle, listItemTextStyle } = useStyles()

	const location = useLocation()

	const itemClickHandler = (event, index) => {
		if (index === list.length - 1) {
			event.preventDefault()

			return logoutUser()
		}
		if (location.pathname === '/' && toggleDrawer) {
			return toggleDrawer(false)
		}
		return false
	}

	return (
		<List component='nav'>
			{list.map(({ Component, title, link }, index) => (
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

NavigationDrawerList.defaultProps = {
	toggleDrawer: undefined,
}

NavigationDrawerList.propTypes = {
	list: PropTypes.arrayOf(PropTypes.object).isRequired,
	name: PropTypes.string.isRequired,
	logoutUser: PropTypes.func.isRequired,
	toggleDrawer: PropTypes.func,
}

const mapStateToProps = state => ({ name: state.auth.user.name })

const mapDispatchToProps = { logoutUser: logoutUserAction }

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavigationDrawerList)
