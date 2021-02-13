import Head from 'next/head'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'

import PageWrapper from 'components/Layout/PageWrapper'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import decodeToken from 'utils/decodeToken'
import { PropsWithUserData } from 'interfaces/user'
import Requset from 'interfaces/requsetResponse'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import getToken from 'utils/getToken'
import createRedirectObject from 'utils/createRedirectObject'
import { LOGIN_URL } from 'variables/global'

const NavigationDrawerList = dynamic(
	() => import('components/Drawers/NavigationDrawerList')
)

interface Props extends PropsWithUserData {}

const PageContent = () => <div>hello world</div>

const Home = ({ userData }: Props) => {
	return (
		<>
			<Head>
				<title>Dev Book</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div>
				<PageWrapper userData={userData}>
					<PageLayoutComponent Drawer={NavigationDrawerList} Content={PageContent} />
				</PageWrapper>
			</div>
		</>
	)
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const userData = decodeToken(token)

	return { props: { userData } }
}
