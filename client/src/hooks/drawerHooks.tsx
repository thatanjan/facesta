import { useContext } from 'react'

import { DrawerContext } from 'context/drawerContext'

export const useDrawerState = (): any => {
	const [drawerState]: any = useContext(DrawerContext)

	return drawerState
}

export const useDrawerDispatch = () => {
	const [, openDrawer, closeDrawer]: any = useContext(DrawerContext)

	return [openDrawer, closeDrawer]
}
