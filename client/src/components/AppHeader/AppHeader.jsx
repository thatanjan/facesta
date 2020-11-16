import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { styled } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import TelegramIcon from '@material-ui/icons/Telegram'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import NavigationDrawer from 'components/Drawers/NavigationDrawer'

const AppHeaderMenus = lazy(() => import('components/AppHeader/AppHeaderMenus'))

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

const urlLastURLSegment = () => {
	const pageURL = window.location.href
	let lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1)

	let result = lastURLSegment.replace(/-/g, ' ')

	if (result === '') result = 'DevBook'

	return result
}

const ToolbarContainer = styled(({ direction, ...props }) => (
	<Toolbar {...props} />
))({
	flexDirection: props => (props.direction === 'reverse' ? 'row-reverse' : null),
})

const AppHeader = () => {
	const matches = useMediaQuery('(max-width:960px)')

	const { pathname } = useLocation()
	const { goBack, push } = useHistory()

	const { menuButton, title } = useStyles()
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

		console.log('drawer clicked')

		setState(open)
	}
	return (
		<>
			<AppBar>
				<ToolbarContainer
					direction={matches && pathname !== '/' ? 'reverse' : null}
				>
					{matches && (
						<>
							<IconButton
								edge='end'
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
						</>
					)}
					<Typography
						variant='h6'
						className={title}
						onClick={!matches ? () => push('/') : null}
					>
						{matches && lastURLSegment}
						{!matches && 'DevBook'}
					</Typography>

					{matches && pathname !== '/' && (
						<IconButton onClick={() => goBack()}>
							<ArrowBackIcon />
						</IconButton>
					)}

					{matches && pathname === '/' && (
						<IconButton onClick={() => push('/message')}>
							<TelegramIcon edge='end' color='secondary' />
						</IconButton>
					)}

					{!matches && <AppHeaderMenus />}
				</ToolbarContainer>
			</AppBar>
		</>
	)
}

export default AppHeader
