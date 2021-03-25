import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import SinglePostPage from 'components/Post/SinglePostPage'
import PageWrapper from 'components/Layout/PageWrapper'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import decodeToken from 'utils/decodeToken'
import { PropsWithUserData } from 'interfaces/user'
import Requset from 'interfaces/requsetResponse'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import getToken from 'utils/getToken'
import createRedirectObject from 'utils/createRedirectObject'
import { LOGIN_URL, APP_NAME } from 'variables/global'

interface Props extends PropsWithUserData {}

const Post = ({ userData }: Props) => {
	return (
		<div>
			<Head>
				<title>{APP_NAME}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>
				<PageWrapper userData={userData}>
					<PageLayoutComponent Content={SinglePostPage} />
				</PageWrapper>
			</div>
			this is a post
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const userData = decodeToken(token)

	return { props: { userData } }
}

export default Post
