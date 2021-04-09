import React from 'react'
import dynamic from 'next/dynamic'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Avatar from '@material-ui/core/Avatar'
import TelegramIcon from '@material-ui/icons/Telegram'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

import CircularLoader from 'components/Loaders/CircularLoader'

import MuiLink from 'components/Links/MuiLink'
import { useOwnUserId } from 'hooks/userhooks'
import { useGetPersonalData } from 'hooks/useGetProfileData'
import splitText from 'utils/splitText'
import { cloudinaryURL } from 'variables/global'

const DropDownMenu = dynamic(
	() => import('components/DropDownMenu/DropDownMenu'),
	{ loading: () => <CircularLoader /> }
)

const useStyles = makeStyles((theme: Theme) => ({
	AccountIconTextStyle: {
		marginLeft: theme.spacing(2),
	},
}))

const AppHeaderMenus = () => {
	const options = ['settings & privacy', 'help and support', 'logout']

	const { AccountIconTextStyle } = useStyles()

	const { push } = useRouter()

	const  id  = useOwnUserId()

	const { data, error } = useGetPersonalData(id)

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const {
		getPersonalData: { profilePicture, name },
	} = data

	const firstName = splitText({
		text: name,
		position: 0,
		divider: ' ',
	})

	return (
		<>
			<IconButton style={{ borderRadius: '10px' }}>
				<Avatar alt={name} src={cloudinaryURL(profilePicture)} />
				<MuiLink
					MuiComponent={Typography}
					href={`/profile/${id}`}
					className={AccountIconTextStyle}
				>
					{firstName}
				</MuiLink>
			</IconButton>

			<IconButton>
				<AddIcon />{' '}
			</IconButton>

			<IconButton edge='end' onClick={() => push('/message')}>
				<TelegramIcon color='secondary' />
			</IconButton>

			<IconButton>
				<NotificationsIcon />
			</IconButton>

			<DropDownMenu
				options={options}
				aria-controls='fade-menu'
				aria-haspopup='true'
				IconComponent={ArrowDropDownCircleIcon}
			/>
		</>
	)
}

export default AppHeaderMenus
