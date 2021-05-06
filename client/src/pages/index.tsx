import Head from 'next/head'
import { GetServerSideProps } from 'next'

import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import Requset from 'interfaces/requsetResponse'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import decodeToken from 'utils/decodeToken'
import getToken from 'utils/getToken'
import createRedirectObject from 'utils/createRedirectObject'
import { LOGIN_URL, APP_NAME } from 'variables/global'
import CreatePost from 'components/Post/CreatePost/CreatePost'
import NewsFeed from 'components/Post/NewsFeed'
import { PageProps } from 'interfaces/global'

import useStoreID from 'redux/hooks/useStoreID'

const PageContent = () => {
	return (
		<>
			<CreatePost />

			<NewsFeed />
		</>
	)
}

const Home = ({ id }: PageProps) => {
	useStoreID(id)

	return (
		<>
			<Head>
				<title>{APP_NAME}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<PageLayoutComponent Content={PageContent} />
		</>
	)
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const { id } = decodeToken(token)

	return { props: { id } }
}
