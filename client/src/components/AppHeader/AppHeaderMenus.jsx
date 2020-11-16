import React, { useState, Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import TelegramIcon from '@material-ui/icons/Telegram'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const DropDownMenu = lazy(() =>
	/* webpackChunkName: "my-component" */ import(
		'components/AppHeader/DropDownMenu'
	)
)

const useStyles = makeStyles(theme => ({
	AccountIconTextStyle: {
		marginLeft: theme.spacing(2),
	},
}))

const AppHeaderMenus = ({ userName }) => {
	// for dropDownMenu
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const { AccountIconTextStyle } = useStyles()

	const { push } = useHistory()

	return (
		<>
			<IconButton style={{ borderRadius: '10px' }}>
				<AccountCircleIcon />
				<Typography className={AccountIconTextStyle}>{userName}</Typography>
			</IconButton>
			<IconButton>
				<AddIcon />{' '}
			</IconButton>
			<IconButton onClick={() => push('/message')}>
				<TelegramIcon edge='end' color='secondary' />
			</IconButton>
			<IconButton>
				<NotificationsIcon />
			</IconButton>
			<IconButton
				aria-controls='fade-menu'
				aria-haspopup='true'
				onClick={handleClick}
			>
				<ArrowDropDownCircleIcon />
			</IconButton>

			<Suspense fallback={<div children='hello' />}>
				<DropDownMenu
					anchorEl={anchorEl}
					setAnchorEl={setAnchorEl}
					handleClose={handleClose}
					open={open}
				/>
			</Suspense>
		</>
	)
}

const mapStateToProps = state => ({
	userName: state.auth.user.name.split(' ')[0],
})
export default connect(mapStateToProps)(AppHeaderMenus)
