import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'
import InfiniteScroll from 'react-infinite-scroll-component'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import RefreshIcon from '@material-ui/icons/Refresh'
import Fab from '@material-ui/core/Fab'
import { useRouter } from 'next/router'

import Post from 'interfaces/post'
import SinglePost from 'components/Post/SinglePost'
import { useGetNewsFeedPost } from 'hooks/useGetPost'

import CircularLoader from 'components/Loaders/CircularLoader'
import Alert from 'components/Alerts/Alert'

const QUERY_NAME = 'getNewsFeedPost'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		fab: {
			position: 'fixed',
			bottom: theme.spacing(3),
			right: theme.spacing(3),
		},
	})
)

const NewsFeed = () => {
	const { data, error, setSize, size, mutate } = useGetNewsFeedPost()

	const { asPath } = useRouter()
	const { fab } = useStyles()

	useEffect(() => {
		const node = document.getElementsByClassName('simplebar-content-wrapper')[0]

		if (asPath === '/') {
			const sessionKeyName = 'newsfeedPosition'
			const prevPosition = sessionStorage.getItem(sessionKeyName)

			node.scrollBy(0, prevPosition ? parseInt(prevPosition, 10) : 0)

			const handleScroll = (postion: number) => {
				sessionStorage.setItem(sessionKeyName, postion.toString())
			}

			if (node) {
				node.addEventListener('scroll', e =>
					handleScroll((e.target as HTMLElement).scrollTop)
				)
			}
		}

		return () => {
			if (node) {
				node.removeEventListener('scroll', () => {})
			}
		}
	}, [asPath])

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
		return <Alert checked severity='error' message='Please try again' />
	}

	return (
		<div>
			<Fab color='secondary' className={fab} onClick={() => mutate()}>
				<RefreshIcon />
			</Fab>

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
