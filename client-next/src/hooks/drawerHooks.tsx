import { useContext } from 'react'

import { DrawerContext } from 'context/drawerContext'

export const useDrawerState = (): any => {
	const [state]: any = useContext(DrawerContext)

	return state
}

export const useDrawerDispatch = () => {
	const [, openDrawer, closeDrawer]: any = useContext(DrawerContext)

	return [openDrawer, closeDrawer]
}
