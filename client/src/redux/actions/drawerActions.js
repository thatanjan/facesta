import { OPEN_DRAWER, CLOSE_DRAWER } from 'redux/actions/types'

export const openDrawer = {
	type: OPEN_DRAWER,
	payload: { open: true },
}

export const closeDrawer = {
	type: CLOSE_DRAWER,
	payload: { open: false },
}
