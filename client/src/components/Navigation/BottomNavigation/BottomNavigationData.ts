import NotificationsIcon from '@material-ui/icons/Notifications'
import HomeIcon from '@material-ui/icons/Home'
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
const home = new NavigationItem('home', HomeIcon)
const search = new NavigationItem('search', SearchIcon)

const navigationItems: NavigationItem[] = [home, search, add, notification]

export default navigationItems
