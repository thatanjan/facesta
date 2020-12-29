import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { styled, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import TelegramIcon from '@material-ui/icons/Telegram'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import NavigationDrawer from 'components/Drawers/NavigationDrawer'
import { useDrawerDispatch } from 'hooks/drawerHooks'
import useGetUser from 'hooks/userhooks'

import AppHeaderMenus from 'components/AppHeader/AppHeaderMenus'

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
	const pageURL: string = window?.location.href

	const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1)

	let result = lastURLSegment.replace(/-/g, ' ')

	if (result === '') result = 'DevBook'

	return result
}

const ToolbarContainer = styled(({ direction, ...props }) => (
	<Toolbar {...props} />
))({
	flexDirection: (props: any) =>
		props.direction === 'reverse' ? 'row-reverse' : null,
})

const AppHeader = () => {
	const matches = useMediaQuery('(max-width:960px)')

	const [isMenuClicked, setIsMenuClicked] = useState(false)

	const [openDrawer, closeDrawer] = useDrawerDispatch()

	const { pathname, push, back, asPath } = useRouter()

	const { menuButton, title } = useStyles()

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
					{matches && (
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
						{!matches && 'DevBook'}
					</Typography>

					{matches && pathname !== '/' && (
						<IconButton onClick={() => back()}>
							<ArrowBackIcon />
						</IconButton>
					)}

					{matches && pathname === '/' && (
						<IconButton edge='end' onClick={() => push('/message')}>
							<TelegramIcon color='secondary' />
						</IconButton>
					)}

					{!matches && <AppHeaderMenus />}
				</ToolbarContainer>
			</AppBar>
		</>
	)
}

export default AppHeader
