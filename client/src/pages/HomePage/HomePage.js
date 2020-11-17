import React from 'react'

// import BackgroundPaper from 'HOC/BackgroundPaper'
import PageLayoutComponent from 'HOC/PageLayoutComponent'

import NavigationDrawerList from 'components/Drawers/NavigationDrawerList'
import listComponents from 'components/Drawers/NavigationDrawerListData'
import ActiveFriends from 'components/Chat/ActiveFriends'
import HomepageComponent from './HomepageComponent'

const HomePage = () => {
	return (
		<PageLayoutComponent
			Drawer={() => <NavigationDrawerList list={listComponents} />}
			Content={HomepageComponent}
			RightSection={() => <ActiveFriends />}
		/>
	)
}

export default HomePage
