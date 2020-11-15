import React from 'react'

// import BackgroundPaper from 'HOC/BackgroundPaper'
import PageLayoutComponent from 'HOC/PageLayoutComponent'

import { NavigationList } from 'components/Drawers/NavigationDrawerList'

const content = () => <div children='content' />
const drawer = () => <div children='content' />
const right = () => <div children='content' />

const HomePage = () => {
	return (
		<PageLayoutComponent
			Drawer={() => <div children='dt' />}
			Content={content}
			RightSection={right}
		/>
	)
}

export default HomePage
