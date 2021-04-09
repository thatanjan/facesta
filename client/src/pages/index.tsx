import { useState } from 'react'
import Head from 'next/head'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'

import PageWrapper from 'components/Layout/PageWrapper'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import UserPayload from 'interfaces/user'
import Requset from 'interfaces/requsetResponse'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import getToken from 'utils/getToken'
import createRedirectObject from 'utils/createRedirectObject'
import { LOGIN_URL, APP_NAME } from 'variables/global'
import CreatePost from 'components/Post/CreatePost/CreatePost'
import AllPost from 'components/Post/AllPosts'

interface Props {
	id: string
}

const PageContent = () => {
	const [shouldMutate, setShouldMutate] = useState(false)

	return (
		<>
			<CreatePost {...{ setShouldMutate }} />

			<AllPost {...{ shouldMutate, setShouldMutate }} />
		</>
	)
}

const Home = ({ id }: Props) => {
	return (
		<>
			<Head>
				<title>{APP_NAME}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div>
				<PageWrapper id={id}>
					<PageLayoutComponent Content={PageContent} />
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

	const { id } = jwtDecode<UserPayload>(token)

	return { props: { id } }
}
