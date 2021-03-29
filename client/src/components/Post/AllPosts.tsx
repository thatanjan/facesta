import React, { useState, UIEvent } from 'react'
import { nanoid } from 'nanoid'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import InfiniteScroll from 'react-infinite-scroll-component'

import Post from 'interfaces/post'
import SinglePost from 'components/Post/SinglePost'
import { useGetNewsFeedPost } from 'hooks/useGetPost'

const useStyles = makeStyles({
	postContainerStyle: {
		maxHeight: '100vh',
		overflowY: 'scroll',
		'-ms-overflow-style': 'none',
		scrollbarWidth: 'none',

		'& ::-webkit-scrollbar': {
			display: 'none',
		},
	},
})

const PostsSection = () => {
	const { postContainerStyle } = useStyles()

	const { data, error, setSize, size, isValidating } = useGetNewsFeedPost()

	const isLoadingInitialData = !data && !error
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && data && typeof data[size - 1] === 'undefined')

	const handleScroll = (event: any) => {
		const {
			target: { scrollHeight, clientHeight, scrollTop },
		} = event

		if (scrollHeight - scrollTop === clientHeight) {
			setSize(size + 1)
		}
	}

	let allPost: Post[] = []

	if (data) {
		data.forEach(element => {
			allPost = [...allPost, ...element.getNewsFeedPost.posts]
		})
	}
	/* hasMore={ data?[data?.length- 1].getNewsFeedPost.posts.length === 0 ? false:   true} */

	return (
		<>
			<button
				type='button'
				onClick={() => {
					setSize(size + 1)
				}}
			>
				add
			</button>

			<InfiniteScroll
				dataLength={allPost.length}
				next={() => setSize(size + 1)}
				hasMore
				loader={<h4>Loading...</h4>}
			>
				{allPost.map((post: Post) => (
					<SinglePost key={nanoid()} {...post} postPage={false} />
				))}
			</InfiniteScroll>

			{error && 'error happened'}

			{/* {isLoadingMore && <div>loading</div>} */}
		</>
	)
}

export default PostsSection
