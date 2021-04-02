import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Avatar from '@material-ui/core/Avatar'
import TelegramIcon from '@material-ui/icons/Telegram'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

import DropDownMenu from 'components/DropDownMenu/DropDownMenu'
import MuiLink from 'components/Links/MuiLink'
import useOwnUser from 'hooks/userhooks'
import { useProfileInfo } from 'hooks/useGetProfileData'
import splitText from 'utils/splitText'
import { cloudinaryURL } from 'variables/global'

const useStyles = makeStyles((theme: Theme) => ({
	AccountIconTextStyle: {
		marginLeft: theme.spacing(2),
	},
}))

const AppHeaderMenus = () => {
	const options = ['settings & privacy', 'help and support', 'logout']

	const { AccountIconTextStyle } = useStyles()

	const { push } = useRouter()

	const { name, id } = useOwnUser()

	const { data, error } = useProfileInfo(id)

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const {
		getUser: {
			name: profileName,
			profile: { profilePicture },
		},
	} = data

	const firstName = splitText({
		text: profileName || name,
		position: 0,
		divider: ' ',
	})

	return (
		<>
			<IconButton style={{ borderRadius: '10px' }}>
				<Avatar alt={profileName || name} src={cloudinaryURL(profilePicture)} />
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
