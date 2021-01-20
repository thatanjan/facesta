import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import HomeIcon from '@material-ui/icons/Home'

import SvgSupport from 'HOC/svgSupport'
import FriendRequests from '../../../public/svgs/friendRequest.svg'

const FriendRequestsIcon = SvgSupport(FriendRequests)

export interface Components {
	title: string
	Component: Function
	link: string
}

interface List {
	[index: number]: Components
	length: number
	map: Function
}

const listComponents: List = [
	{
		title: 'Home',
		Component: HomeIcon,
		link: '/',
	},
	{
		title: 'user',
		Component: AccountCircleIcon,
		link: '/profile',
	},
	{
		title: 'Videos',
		Component: VideoLibraryIcon,
		link: '/videos',
	},
	{
		title: 'Followers',
		Component: FriendRequestsIcon,
		link: '/followers',
	},
	{
		title: 'Following',
		Component: FriendRequestsIcon,
		link: '/following',
	},
	{
		title: 'Settings',
		Component: SettingsIcon,
		link: '/settings',
	},
	{
		title: 'Log Out',
		Component: ExitToAppIcon,
		link: '',
	},
]

export default listComponents
