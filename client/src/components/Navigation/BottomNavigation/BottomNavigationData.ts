import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'

export class NavigationItem {
	label: string

	value: string

	icon: Function

	constructor(label: string, icon: Function) {
		this.label = label
		this.value = label.toLowerCase()
		this.icon = icon
	}
}

const notification = new NavigationItem('notification', NotificationsIcon)
const add = new NavigationItem('add', AddIcon)
const profile = new NavigationItem('profile', AccountCircleIcon)
const search = new NavigationItem('search', SearchIcon)

const navigationItems: NavigationItem[] = [profile, search, add, notification]

export default navigationItems
