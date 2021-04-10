import React from 'react'
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

const ERROR_MESSAGE = 'errorMessage'
const QUERY_NAME = 'getNewsFeedPost'

const NewsFeed = ({ shouldMutate }: Props) => {
	const { data, error, setSize, size, mutate } = useGetNewsFeedPost()

	if (!data)
		return (
			<Alert
				checked
				severity='info'
				message='Please wait we are loading your news feed'
			/>
		)

	let isLoadingMore = true

	let allPost: Post[] = []

	try {
		const lastResponse = data[size - 1]

		if (lastResponse && lastResponse[QUERY_NAME]) {
			const { errorMessage } = lastResponse[QUERY_NAME]

			if (errorMessage) {
				console.log(errorMessage)
			}

			const { posts } = lastResponse[QUERY_NAME]

			if (Array.isArray(posts) && (posts.length === 0 || posts.length < 10)) {
				isLoadingMore = false
			}

			if (Array.isArray(posts)) {
				console.log(allPost)
				allPost = allPost.concat(posts)
			}
		}
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
			>
				{Array.isArray(allPost) &&
					allPost.map((post: Post) => (
						<SinglePost key={nanoid()} {...post} postPage={false} />
					))}
			</InfiniteScroll>

			{error && <Alert checked severity='error' message='Please try again' />}
		</div>
	)
}

export default NewsFeed
