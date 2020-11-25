import { OPEN_DRAWER, CLOSE_DRAWER } from 'redux/actions/types'
const initialState = {
	isDrawerOpen: false,
	toggleDrawer: null,
}

const toggleDrawer = (state, payload) => event => {
	if (
		event &&
		event.type === 'keydown' &&
		(event.key === 'Tab' || event.key === 'Shift')
	) {
		return
	}
}

const drawerReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case OPEN_DRAWER:
			toggleDrawer()
			return { ...state, isDrawerOpen: payload.open }

		case CLOSE_DRAWER:
			toggleDrawer()
			return { ...state, isDrawerOpen: payload.open }

		default:
			return state
	}
}

export default drawerReducer
