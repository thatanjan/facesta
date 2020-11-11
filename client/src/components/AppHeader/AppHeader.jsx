import React, { useState, useEffect } from 'react'
import { withRouter, Link as RouterLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import TelegramIcon from '@material-ui/icons/Telegram'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

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
	headerTitle: {
		textTransform: 'capitalize',
	},
}))

const urlLastURLSegment = () => {
	const pageURL = window.location.href
	let lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1)

	const result = lastURLSegment.replace(/-/g, ' ')

	return result
}

const AppHeader = ({ location: { pathname }, history: { goBack } }) => {
	const { headerTitle, menuButton, title } = useStyles()
	const [state, setState] = useState(false)

	const [lastURLSegment, setLastURLSegment] = useState('')

	useEffect(() => {
		setLastURLSegment(urlLastURLSegment())
	}, [window.location.href])

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
					{pathname === '/' ? (
						<>
							<IconButton
								edge='start'
								className={menuButton}
								onClick={toggleDrawer(!state)}
								color='inherit'
								aria-label='menu'
								aria-controls='menu-appbar'
								aria-haspopup='true'
							>
								<MenuIcon />
							</IconButton>
							<NavigationDrawer toggleDrawer={toggleDrawer} toggleState={state} />

							<Typography variant='h6' className={title}>
								Facebook
							</Typography>

							<IconButton>
								<TelegramIcon edge='end' color='secondary' />
							</IconButton>
						</>
					) : (
						<>
							<IconButton onClick={() => goBack()}>
								<ArrowBackIcon />
							</IconButton>

							<Typography component='h3' className={headerTitle}>
								{lastURLSegment}
							</Typography>
						</>
					)}
				</Toolbar>
			</AppBar>
		</>
	)
}

export default withRouter(AppHeader)
