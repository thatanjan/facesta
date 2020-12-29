import Head from 'next/head'
import Typography from '@material-ui/core/Typography'
import useGetUser from 'hooks/userhooks'

import PageLayout from 'HOC/PageLayoutComponent'

import NavigationDrawerList from 'components/Drawers/NavigationDrawerList'
import Content from 'components/Home/HomepageComponent'

const OtherContent = () => <h1>hello world</h1>

const Home = () => {
	const { name } = useGetUser()

	return (
		<div className='home'>
			<Head>
				<title>DevBook</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<PageLayout
				Drawer={() => <NavigationDrawerList />}
				Content={() => <Content />}
				RightSection={() => <OtherContent />}
			/>
		</div>
	)
}

export default Home
