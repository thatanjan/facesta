import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import TelegramIcon from '@material-ui/icons/Telegram'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'

export default class NavigationItem {
	label: string

	value: string

	Component: Function

	constructor(label: string, Component: Function) {
		this.label = label
		this.value = label.toLowerCase()
		this.Component = Component
	}
}

const notification = new NavigationItem('notification', NotificationsIcon)
const profile = new NavigationItem('profile', AccountCircleIcon)
const chat = new NavigationItem('chat', TelegramIcon)
const dropdown = new NavigationItem('dropdown', ArrowDropDownCircleIcon)

export { notification, profile, chat, dropdown }
