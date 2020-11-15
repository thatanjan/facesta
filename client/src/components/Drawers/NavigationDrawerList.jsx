import React from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// data
import listComponents from './NavigationDrawerListData'

// action
import { logoutUser } from 'redux/actions/authActions'

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

const NavigationList = ({ logoutUser, name, toggleDrawer }) => {
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

	const itemClickHandler = index => {
		if (index === listComponents.length - 1) {
			return logoutHandeler
		} else {
			return toggleDrawer(false)
		}
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
						onClick={itemClickHandler(index)}
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
