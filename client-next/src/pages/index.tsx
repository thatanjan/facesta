import Head from 'next/head'
import Typography from '@material-ui/core/Typography'

import PageLayout from 'HOC/PageLayoutComponent'

import NavigationDrawerList from 'components/Drawers/NavigationDrawerList'
import Content from 'components/Home/HomepageComponent'
import ActiveFriends from 'components/Chat/ActiveFriends'

const Home = () => {
	return (
		<div className='home'>
			<Head>
				<title>DevBook</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<PageLayout
				Drawer={() => <NavigationDrawerList />}
				Content={() => <Content />}
				RightSection={() => <ActiveFriends />}
			/>
		</div>
	)
}

export default Home
