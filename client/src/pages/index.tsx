import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'

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

	const description =
		'A social media application to help people overcome their imposter syndrome'
	const url = 'http://con-fession.vercel.app/'
	return (
		<>
			<NextSeo
				title={APP_NAME}
				description={description}
				canonical={url}
				openGraph={{
					type: 'website',
					title: APP_NAME,
					description,
					url,
					site_name: APP_NAME,
					images: [
						{
							url: '/banner.png',
							alt: description,
							height: 1080,
							width: 1920,
						},
					],
				}}
			/>

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
