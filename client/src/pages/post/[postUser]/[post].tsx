import React from 'react'
import { NextSeo } from 'next-seo'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { responseInterface } from 'swr'

import SinglePostPage from 'components/Post/SinglePostPage'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import decodeToken from 'utils/decodeToken'
import Requset from 'interfaces/requsetResponse'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import getToken from 'utils/getToken'
import createRedirectObject from 'utils/createRedirectObject'
import { LOGIN_URL } from 'variables/global'
import { PageProps } from 'interfaces/global'
import Post from 'interfaces/post'

import PreLoader from 'components/Loaders/PreLoader'
import SwrErrorAlert from 'components/Alerts/SwrErrorAlert'

import { useGetSinglePost } from 'hooks/useGetPost'
import useStoreID from 'redux/hooks/useStoreID'

interface Props extends PageProps {}

const PostPage = ({ id }: Props) => {
	useStoreID(id)
	const {
		query: { postUser, post },
	} = useRouter()

	const {
		data,
		error,
	}: responseInterface<
		{
			getSinglePost: {
				post: Post
			}
		},
		any
	> = useGetSinglePost({ user: postUser as string, postID: post as string })

	if (!data) return <PreLoader />
	if (error) return <SwrErrorAlert />

	const {
		getSinglePost: {
			post: {
				user: {
					profile: { name },
				},
				title,
				content,
				image,
			},
		},
	} = data

	return (
		<div>
			<NextSeo
				title={`${title} by ${name}`}
				description={content}
				openGraph={{
					title,
					description: content,
					url: `https://con-fession.vercel.app/post/${postUser}/${post}`,
					type: 'article',
					article: {
						authors: [`https://con-fession.vercel.app/profile/${postUser}`],
					},
					images: [
						{
							url: image,
							alt: content,
						},
					],
				}}
			/>

			<PageLayoutComponent Content={SinglePostPage} />
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const { id } = decodeToken(token)

	return { props: { id } }
}

export default PostPage
