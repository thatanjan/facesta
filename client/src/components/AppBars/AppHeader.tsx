import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { styled, makeStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import TelegramIcon from '@material-ui/icons/Telegram'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

import NavigationDrawer from 'components/Drawers/NavigationDrawer'
import { useDrawerDispatch } from 'hooks/drawerHooks'
import { APP_NAME, screenSizeDrawer } from 'variables/global'

import AppHeaderMenus from 'components/AppBars/AppHeaderMenus'

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

const urlLastURLSegment = () => {
	const pageURL: string = window?.location.href

	const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1)

	let result = lastURLSegment.replace(/-/g, ' ')

	if (result === '') result = APP_NAME

	return result
}

const ToolbarContainer = styled(({ ...props }) => <Toolbar {...props} />)({
	flexDirection: (props: any) =>
		props.direction === 'reverse' ? 'row-reverse' : 'initial',
})

const AppHeader = () => {
	const matches = useMediaQuery(screenSizeDrawer)

	const [isMenuClicked, setIsMenuClicked] = useState(false)

	const [openDrawer, closeDrawer] = useDrawerDispatch()

	const { pathname, push, asPath } = useRouter()

	const {
		menuButton,
		title,
		search,
		searchIcon,
		inputInput,
		inputRoot,
	} = useStyles()

	const [lastURLSegment, setLastURLSegment] = useState('')

	const handleMenuClick = () => {
		setIsMenuClicked(false)

		if (isMenuClicked) {
			closeDrawer()
			return true
		}

		openDrawer()

		return true
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setLastURLSegment(urlLastURLSegment())
		}
	}, [asPath])

	return (
		<>
			<AppBar>
				<ToolbarContainer
					direction={matches && pathname !== '/' ? 'reverse' : null}
				>
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

					<Typography
						variant='h6'
						className={title}
						component='h6'
						onClick={!matches ? () => push('/') : undefined}
					>
						{matches && lastURLSegment}
						{!matches && APP_NAME}
					</Typography>

					<div className={search}>
						<div className={searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder='Search…'
							classes={{
								root: inputRoot,
								input: inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>

					{!matches && (
						<IconButton edge='end' onClick={() => push('/message')}>
							<TelegramIcon color='secondary' />
						</IconButton>
					)}

					{matches && <AppHeaderMenus />}
				</ToolbarContainer>
			</AppBar>
		</>
	)
}

export default AppHeader
