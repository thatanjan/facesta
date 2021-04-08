import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { nanoid } from 'nanoid'

import InfiniteScroll from 'react-infinite-scroll-component'

import Post from 'interfaces/post'

import CircularLoader from 'components/Loaders/CircularLoader'
import { useGetNewsFeedPost } from 'hooks/useGetPost'
import { useHaveSeenFeedOnce } from 'hooks/userhooks'

const SinglePost = dynamic(() => import('components/Post/SinglePost'), {
	loading: () => <CircularLoader />,
})

const Alert = dynamic(() => import('components/Alerts/Alert'), {
	loading: () => <CircularLoader />,
})

interface Props {
	shouldMutate: boolean
}

const PostsSection = ({ shouldMutate }: Props) => {
	const { data, error, setSize, size, mutate } = useGetNewsFeedPost()
	const [haveSeenFeedOnce, setHaveSeenFeedOnce] = useHaveSeenFeedOnce()

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

	let allPost: Post[] = []

	try {
		if (data) {
			if (data[size - 1]) {
				if (data[size - 1].getNewsFeedPost?.posts.length === 0) {
					isLoadingMore = false
				}
			}

			data.forEach(element => {
				allPost = [...allPost, ...element.getNewsFeedPost.posts]
			})
		}
	} catch (e) {
		return <Alert checked severity='error' message='Please try again' />
	}

	if (allPost.length === 0)
		return <Alert checked severity='info' message=' Sorry you have no Post' />

	return (
		<>
			<InfiniteScroll
				dataLength={allPost.length}
				next={() => setSize(size + 1)}
				hasMore={isLoadingMore as boolean}
				loader={<h4>Loading...</h4>}
			>
				{Array.isArray(allPost) &&
					allPost.map((post: Post) => (
						<SinglePost key={nanoid()} {...post} postPage={false} />
					))}
			</InfiniteScroll>

			{error && <Alert checked severity='error' message='Please try again' />}
		</>
	)
}

export default PostsSection
