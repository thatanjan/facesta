import React from 'react'
import { nanoid } from 'nanoid'
import InfiniteScroll from 'react-infinite-scroll-component'

import Post from 'interfaces/post'
import SinglePost from 'components/Post/SinglePost'
import { useGetNewsFeedPost } from 'hooks/useGetPost'

const PostsSection = () => {
	const { data, error, setSize, size } = useGetNewsFeedPost()

	let isLoadingMore = true

	let allPost: Post[] = []

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

	return (
		<>
			<InfiniteScroll
				dataLength={allPost.length}
				next={() => setSize(size + 1)}
				hasMore={isLoadingMore as boolean}
				loader={<h4>Loading...</h4>}
			>
				{allPost.map((post: Post) => (
					<SinglePost key={nanoid()} {...post} postPage={false} />
				))}
			</InfiniteScroll>

			{error && 'error happened'}
		</>
	)
}

export default PostsSection
