import React from 'react'

// import BackgroundPaper from 'HOC/BackgroundPaper'
import PageLayoutComponent from 'HOC/PageLayoutComponent'

import NavigationDrawerList from 'components/Drawers/NavigationDrawerList'
import listComponents from 'components/Drawers/NavigationDrawerListData'
import ActiveFriends from 'components/Chat/ActiveFriends'

const content = () => <div children='content' />

const HomePage = () => {
	return (
		<PageLayoutComponent
			Drawer={() => <NavigationDrawerList list={listComponents} />}
			Content={content}
			RightSection={() => <ActiveFriends />}
		/>
	)
}

export default HomePage
