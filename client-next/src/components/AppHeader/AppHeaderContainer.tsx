import React from 'react'
import DrawerContextProvider from 'context/drawerContext'

import AppHeader from './AppHeader'

const AppHeaderContainer = () => {
	return (
		<>
			<DrawerContextProvider>
				<AppHeader />
			</DrawerContextProvider>
		</>
	)
}

export default AppHeaderContainer
