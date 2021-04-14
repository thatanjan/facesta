import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'
import InfiniteScroll from 'react-infinite-scroll-component'

import Post from 'interfaces/post'
import SinglePost from 'components/Post/SinglePost'
import { useGetNewsFeedPost } from 'hooks/useGetPost'
import { useHaveSeenFeedOnce } from 'hooks/userhooks'

import CircularLoader from 'components/Loaders/CircularLoader'
import Alert from 'components/Alerts/Alert'

interface Props {
	shouldMutate: boolean
}

const QUERY_NAME = 'getNewsFeedPost'

const NewsFeed = ({ shouldMutate }: Props) => {
	const { data, error, setSize, size, mutate } = useGetNewsFeedPost()

	const { haveSeenFeedOnce, setHaveSeenFeedOnce } = useHaveSeenFeedOnce()

	useEffect(() => {
		if (shouldMutate) {
			mutate()
		}
	}, [shouldMutate])

	useEffect(() => {
		if (haveSeenFeedOnce && !shouldMutate) {
			mutate()
		}
	}, [haveSeenFeedOnce])

	useEffect(() => {
		if (!haveSeenFeedOnce) {
			setHaveSeenFeedOnce(true)
		}
	}, [])

	if (!data)
		return (
			<Alert
				checked
				severity='info'
				message='Please wait we are loading your news feed'
			/>
		)

	let isLoadingMore = true

	let errorFromServer = false

	let allPost: Post[] = []

	try {
		const lastResponse = data[size - 1]

		if (lastResponse && lastResponse[QUERY_NAME]) {
			const { errorMessage } = lastResponse[QUERY_NAME]

			if (errorMessage) {
				console.log('from erroMessage:', errorMessage)
				errorFromServer = true
			}

			const { posts } = lastResponse[QUERY_NAME]

			if (Array.isArray(posts) && (posts.length === 0 || posts.length < 10)) {
				isLoadingMore = false
			}
		}

		data.forEach(element => {
			allPost = [...allPost, ...element.getNewsFeedPost.posts]
		})
	} catch (_) {
		console.log('from catch:', _)
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
						<SinglePost key={nanoid()} {...post} postPage={false} />
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

export default NewsFeed
