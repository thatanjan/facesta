import React from 'react'
import { NextSeo } from 'next-seo'
import { GetServerSideProps } from 'next'
import { responseInterface } from 'swr'

import SinglePostPage from 'components/Post/SinglePostPage'
import PageWrapper from 'components/Layout/PageWrapper'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import decodeToken from 'utils/decodeToken'
import Requset from 'interfaces/requsetResponse'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import getToken from 'utils/getToken'
import createRedirectObject from 'utils/createRedirectObject'
import { LOGIN_URL } from 'variables/global'
import { PageProps } from 'interfaces/global'
import Post from 'interfaces/post'

import CircularLoader from 'components/Loaders/CircularLoader'
import SwrErrorAlert from 'components/Alerts/SwrErrorAlert'

import { useGetSinglePost } from 'hooks/useGetPost'

interface Props extends PageProps {
	post: string
	postUser: string
}

const PostPage = ({ id, post, postUser }: Props) => {
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
	> = useGetSinglePost({ user: postUser, postID: post })

	if (!data) return <CircularLoader />
	if (error) return <SwrErrorAlert />

	const {
		getSinglePost: {
			post: {
				user: {
					profile: { name },
				},
				headline,
			},
		},
	} = data

	return (
		<div>
			<NextSeo title={`${headline} by ${name}`} />
			<div>
				<PageWrapper id={id}>
					<PageLayoutComponent Content={SinglePostPage} />
				</PageWrapper>
			</div>
			this is a post
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query: { postUser, post },
}) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const { id } = decodeToken(token)

	return { props: { id, postUser, post } }
}

export default PostPage
