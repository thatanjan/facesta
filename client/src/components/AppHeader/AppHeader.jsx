import React, { useState, useEffect, lazy } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
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

// actions
import { openDrawer, closeDrawer } from 'redux/actions/drawerActions'

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
	const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1)

	let result = lastURLSegment.replace(/-/g, ' ')

	if (result === '') result = 'DevBook'

	return result
}

const ToolbarContainer = styled(({ direction, ...props }) => (
	<Toolbar {...props} />
))({
	flexDirection: props => (props.direction === 'reverse' ? 'row-reverse' : null),
})

const AppHeader = ({ isDrawerOpen, openDrawer, closeDrawer }) => {
	console.log(closeDrawer)
	const matches = useMediaQuery('(max-width:960px)')

	const { pathname } = useLocation()
	const { goBack, push } = useHistory()

	const { menuButton, title } = useStyles()

	const [lastURLSegment, setLastURLSegment] = useState('')

	console.log(useLocation())

	useEffect(() => {
		setLastURLSegment(urlLastURLSegment())
	}, [window.location.href])

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
								onClick={isDrawerOpen ? closeDrawer : openDrawer}
								color='inherit'
								aria-label='menu'
								aria-controls='menu-appbar'
								aria-haspopup='true'
							>
								<MenuIcon />
							</IconButton>
							<NavigationDrawer />
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

const mapStateToProps = state => ({
	isDrawerOpen: state.drawer.isDrawerOpen,
})

const mapDispatchToProps = dispatch => ({
	openDrawer: () => dispatch(openDrawer),
	closeDrawer: () => dispatch(closeDrawer),
})

AppHeader.propTypes = {
	openDrawer: PropTypes.func.isRequired,
	closeDrawer: PropTypes.func.isRequired,
	isDrawerOpen: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
