import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import TelegramIcon from '@material-ui/icons/Telegram'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const DropDownMenu = lazy(() =>
	/* webpackChunkName: "my-component" */ import(
		'components/DropDownMenu/DropDownMenu'
	)
)

const useStyles = makeStyles(theme => ({
	AccountIconTextStyle: {
		marginLeft: theme.spacing(2),
	},
}))

const AppHeaderMenus = ({ userName }) => {
	// for dropDownMenu
	const options = ['settings & privacy', 'help and support', 'logout']

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
			<Suspense fallback={<CircularProgress />}>
				<DropDownMenu
					options={options}
					aria-controls='fade-menu'
					aria-haspopup='true'
					IconComponent={ArrowDropDownCircleIcon}
				/>
			</Suspense>
		</>
	)
}

AppHeaderMenus.propTypes = {
	userName: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
	userName: state.auth.user.name.split(' ')[0],
})
export default connect(mapStateToProps)(AppHeaderMenus)
