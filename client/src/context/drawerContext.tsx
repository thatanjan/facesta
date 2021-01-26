import React, { createContext, ReactNode, useState } from 'react'

interface Props {
	children: ReactNode
}

export const DrawerContext = createContext({})

const DrawerContextProvider = ({ children }: Props) => {
	const [drawerState, setDrawerState] = useState(false)

	const openDrawer: Function = () => {
		setDrawerState(true)
	}

	const closeDrawer: Function = () => {
		setDrawerState(false)
	}

	return (
		<DrawerContext.Provider value={[drawerState, openDrawer, closeDrawer]}>
			{children}
		</DrawerContext.Provider>
	)
}

export default DrawerContextProvider
