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

export const HOME = 'home'
export const SEARCH = 'search'
export const NOTIFICATION = 'notification'
export const ADD = 'add'

const notification = new NavigationItem(NOTIFICATION, NotificationsIcon)
const add = new NavigationItem(ADD, AddIcon)
const home = new NavigationItem(HOME, HomeIcon)
const search = new NavigationItem(SEARCH, SearchIcon)

const navigationItems: NavigationItem[] = [home, search, add, notification]

export default navigationItems
