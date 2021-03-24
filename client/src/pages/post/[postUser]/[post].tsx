import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import PageWrapper from 'components/Layout/PageWrapper'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import decodeToken from 'utils/decodeToken'
import { PropsWithUserData } from 'interfaces/user'
import Requset from 'interfaces/requsetResponse'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import getToken from 'utils/getToken'
import createRedirectObject from 'utils/createRedirectObject'
import { LOGIN_URL, APP_NAME } from 'variables/global'
import { useGetSinglePost } from 'hooks/useGetPost'

interface Props extends PropsWithUserData {}

const PageContent = () => {
	const {
		query: { post, postUser },
		asPath,
	} = useRouter()

	const { data, error } = useGetSinglePost({
		user: postUser as string,
		postID: post as string,
	})

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	console.log(data)

	return null
}

const Post = ({ userData }: Props) => {
	return (
		<div>
			<Head>
				<title>{APP_NAME}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>
				<PageWrapper userData={userData}>
					<PageLayoutComponent Content={PageContent} />
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
