import React, { createContext, ReactNode, useReducer } from 'react'

import { DrawerState } from 'interfaces/drawer'
import { AnyObject } from 'interfaces/global'

import drawerReducer, {
	CLOSE_DRAWER,
	OPEN_DRAWER,
} from 'reducers/drawerReducer'

interface Props {
	children: ReactNode
}

const initialState: DrawerState = {
	isDrawerOpen: false,
}

const actionCreator = (type: string, payload: { open: boolean }) => ({
	type,
	payload,
})

export const DrawerContext = createContext({})

const DrawerContextProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(drawerReducer, initialState)

	const openDrawer: Function = () => {
		dispatch(actionCreator(OPEN_DRAWER, { open: true }))
	}

	const closeDrawer: Function = () => {
		dispatch(actionCreator(CLOSE_DRAWER, { open: false }))
	}

	return (
		<DrawerContext.Provider value={[state, openDrawer, closeDrawer]}>
			{children}
		</DrawerContext.Provider>
	)
}

export default DrawerContextProvider
