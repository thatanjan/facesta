import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import TelegramIcon from '@material-ui/icons/Telegram'

import NavigationDrawer from 'components/Drawers/NavigationDrawer'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}))

const AppHeader = () => {
	const classes = useStyles()
	const [state, setState] = useState(false)

	const toggleDrawer = open => event => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return
		}

		console.log(state)

		setState(open)
	}
	return (
		<>
			<AppBar>
				<Toolbar>
					<IconButton
						edge='start'
						className={classes.menuButton}
						onClick={toggleDrawer(!state)}
						color='inherit'
						aria-label='menu'
						aria-controls='menu-appbar'
						aria-haspopup='true'
					>
						<MenuIcon />
					</IconButton>
					<NavigationDrawer toggleDrawer={toggleDrawer} toggleState={state} />

					<Typography variant='h6' className={classes.title}>
						Facebook
					</Typography>

					<IconButton>
						<TelegramIcon edge='end' color='secondary' />
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default AppHeader
