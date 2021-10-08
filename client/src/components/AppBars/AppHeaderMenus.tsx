import React from 'react'
import dynamic from 'next/dynamic'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import TelegramIcon from '@material-ui/icons/Telegram'
import GitHubIcon from '@material-ui/icons/GitHub'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

import CircularLoader from 'components/Loaders/CircularLoader'
import UserAvatar from 'components/Avatars/UserAvatar'

import MuiLink from 'components/Links/MuiLink'
import { useUserID } from 'redux/hooks/stateHooks'

import { useGetPersonalData } from 'hooks/useGetProfileData'
import splitText from 'utils/splitText'

const DropDownMenu = dynamic(
	() => import('components/DropDownMenu/DropDownMenu')
)

const useStyles = makeStyles((theme: Theme) => ({
	AccountIconTextStyle: {
		marginLeft: theme.spacing(2),
	},
}))

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

export class DropDownMenuOption {
	name: string

	path: string

	constructor(name: string, path: string) {
		this.name = name
		this.path = path
	}
}

const AppHeaderMenus = () => {
	const options: DropDownMenuOption[] = [
		new DropDownMenuOption('settings & privacy', '/settings'),
		new DropDownMenuOption('help and support', '/help'),
		new DropDownMenuOption('logout', '/authentication/logout'),
	]

	const { AccountIconTextStyle } = useStyles()

	const { push } = useRouter()

	const id = useUserID()

	const shouldShowSearchBox = useMediaQuery('( min-width:600px )')

	const { data, error } = useGetPersonalData(id)

	if (error) return <SwrErrorAlert />
	if (!data) return <CircularLoader />

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
				<UserAvatar alt={name} imageID={profilePicture} href={`/profile/${id}`} />
				<MuiLink
					MuiComponent={Typography}
					href={`/profile/${id}`}
					className={AccountIconTextStyle}
				>
					{firstName}
				</MuiLink>
			</IconButton>

			<IconButton edge='end' onClick={() => push('/message')}>
				<TelegramIcon />
			</IconButton>

			{shouldShowSearchBox && (
				<IconButton edge='end' onClick={() => push('/search')}>
					<SearchIcon />
				</IconButton>
			)}
			<IconButton>
				<NotificationsIcon />
			</IconButton>

			<MuiLink
				MuiComponent={IconButton}
				href='https://github.com/thatanjan/confession'
			>
				<GitHubIcon />
			</MuiLink>

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
