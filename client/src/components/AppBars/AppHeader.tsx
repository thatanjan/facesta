import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { makeStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import TelegramIcon from '@material-ui/icons/Telegram'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

import CircularLoader from 'components/Loaders/CircularLoader'
import MuiLink from 'components/Links/MuiLink'

import { APP_NAME, screenSizeDrawer } from 'variables/global'

import { useAppDispatch } from 'redux/hooks/hooks'
import { toggleDrawer } from 'redux/slices/drawerSlice'

const NavigationDrawer = dynamic(
	() => import('components/Drawers/NavigationDrawer'),
	{ loading: () => <CircularLoader /> }
)

const AppHeaderMenus = dynamic(
	() => import('components/AppBars/AppHeaderMenus')
)

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
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}))

const AppHeader = () => {
	const matches = useMediaQuery(screenSizeDrawer)

	const { push } = useRouter()

	const { menuButton, title } = useStyles()

	const dispatch = useAppDispatch()

	const handleMenuClick = () => {
		dispatch(toggleDrawer())

		return true
	}

	return (
		<>
			<AppBar>
				<Toolbar>
					{!matches && (
						<>
							<IconButton
								edge='end'
								className={menuButton}
								color='inherit'
								aria-label='menu'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleMenuClick}
							>
								<MenuIcon />
							</IconButton>
							<NavigationDrawer />
						</>
					)}

					<Box className={title}>
						<MuiLink href='/' MuiComponent={Typography} variant='h6'>
							{APP_NAME}
						</MuiLink>
					</Box>

					{!matches && (
						<IconButton edge='end' onClick={() => push('/development')}>
							<TelegramIcon />
						</IconButton>
					)}

					{matches && <AppHeaderMenus />}
				</Toolbar>
			</AppBar>
		</>
	)
}

export default AppHeader
