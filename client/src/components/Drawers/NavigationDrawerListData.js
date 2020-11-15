import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import HomeIcon from '@material-ui/icons/Home'

import { ReactComponent as FriendRequests } from 'assets/svgs/friendRequest.svg'
import SvgSupport from 'HOC/svgSupport'

const FriendRequestsIcon = SvgSupport(FriendRequests)

const listComponents = [
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
		title: 'Trending',
		Component: TrendingUpIcon,
		link: '/trending',
	},
	{
		title: 'Videos',
		Component: VideoLibraryIcon,
		link: '/videos',
	},
	{
		title: 'Friend Requests',
		Component: FriendRequestsIcon,
		link: '/friend-request',
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
