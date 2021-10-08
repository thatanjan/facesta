import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'
import InfiniteScroll from 'react-infinite-scroll-component'
import dynamic from 'next/dynamic'

import CircularLoader from 'components/Loaders/CircularLoader'
import Alert from 'components/Alerts/Alert'

import Post from 'interfaces/post'
import useGetAllPosts from 'hooks/useGetPost'
import { useGetPersonalData } from 'hooks/useGetProfileData'

import {
	useShouldMutateAllPost,
	useMutateAllPost,
} from 'redux/hooks/useNewsFeed'
import { useProfileUserID } from 'redux/hooks/stateHooks'

const SinglePost = dynamic(() => import('components/Post/SinglePost'))

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

const QUERY_NAME = 'getAllPost'

const Posts = () => {
	const profileID = useProfileUserID()
	const { data, error, size, setSize, mutate } = useGetAllPosts()
	const { data: profileData, error: profileError } = useGetPersonalData(
		profileID
	)

	const shouldMutateAllPost = useShouldMutateAllPost()
	const mutateAllPost = useMutateAllPost()

	useEffect(() => {
		mutate()
		return () => {
			mutate(data, false)
		}
	}, [])

	useEffect(() => {
		if (shouldMutateAllPost) {
			mutate()
			mutateAllPost()
		}
	}, [mutateAllPost])

	if (!data || !profileData)
		return (
			<Alert
				checked
				severity='info'
				message='Please wait we are loading the posts'
			/>
		)

	if (profileError || error) return <SwrErrorAlert />

	const { name, profilePicture } = profileData.getPersonalData

	const user = { _id: profileID, profile: { name, profilePicture } }

	let isLoadingMore = true

	let errorFromServer = false

	let allPost: Post[] = []

	try {
		const lastResponse = data[size - 1]

		if (lastResponse && lastResponse[QUERY_NAME]) {
			const { errorMessage } = lastResponse[QUERY_NAME]

			if (errorMessage) {
				errorFromServer = true
			}

			const { posts } = lastResponse[QUERY_NAME]

			if (Array.isArray(posts) && (posts.length === 0 || posts.length < 10)) {
				isLoadingMore = false
			}
		}

		data.forEach(element => {
			allPost = [...allPost, ...element[QUERY_NAME].posts]
		})
	} catch (_) {
		return <Alert checked severity='error' message='Please try again' />
	}

	return (
		<div>
			<InfiniteScroll
				dataLength={allPost.length}
				next={() => setSize(size + 1)}
				hasMore={isLoadingMore as boolean}
				loader={<CircularLoader />}
				scrollableTarget='scrollableDiv'
			>
				{Array.isArray(allPost) &&
					allPost.map((post: Post) => (
						<SinglePost key={nanoid()} {...post} postPage={false} user={user} />
					))}
			</InfiniteScroll>

			{(error || errorFromServer) && (
				<Alert checked severity='error' message='Please try again' />
			)}

			{!isLoadingMore && (
				<Alert checked severity='info' message='No more post to show' />
			)}
		</div>
	)
}

export default Posts
