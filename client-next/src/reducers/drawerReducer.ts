import { DrawerState } from 'interfaces/drawer'

interface Action {
	type: string
	payload: {
		open: boolean
	}
}

export const OPEN_DRAWER = 'OPEN_DRAWER'
export const CLOSE_DRAWER = 'CLOSE_DRAWER'

const toggleDrawer = () => (event: any) => {
	if (
		event &&
		event.type === 'keydown' &&
		(event.key === 'Tab' || event.key === 'Shift')
	) {
		return true
	}

	return false
}

const drawerReducer = (
	state: DrawerState,
	{ type, payload: { open } }: Action
) => {
	switch (type) {
		case OPEN_DRAWER:
			toggleDrawer()
			return { ...state, isDrawerOpen: open }

		case CLOSE_DRAWER:
			toggleDrawer()
			return { ...state, isDrawerOpen: open }

		default:
			return state
	}
}

export default drawerReducer
