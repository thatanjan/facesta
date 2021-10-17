import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import UserAvatar from 'components/Avatars/UserAvatar'
import { useGetPersonalData } from 'hooks/useGetProfileData'
import { useUserID } from 'redux/hooks/stateHooks'

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
export const ADD = 'add'
export const ACCOUNT = 'Account'

const User = () => {
	const id = useUserID()

	const { data, error } = useGetPersonalData(id)

	if (error) return AccountCircleIcon
	if (!data) return null
	const {
		getPersonalData: { profilePicture, name },
	} = data

	return (
		<UserAvatar alt={name} imageID={profilePicture} href={`/profile/${id}`} />
	)
}

const add = new NavigationItem(ADD, AddIcon)
const home = new NavigationItem(HOME, HomeIcon)
const search = new NavigationItem(SEARCH, SearchIcon)
const account = new NavigationItem(ACCOUNT, User)

const navigationItems: NavigationItem[] = [home, search, add, account]

export default navigationItems
