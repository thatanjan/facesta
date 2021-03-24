import React from 'react'
import { nanoid } from 'nanoid'

import Post from 'interfaces/post'
import SinglePost from 'components/Post/SinglePost'
import { useGetNewsFeedPost } from 'hooks/useGetPost'

const PostsSection = () => {
	const { data, error, setSize, size } = useGetNewsFeedPost()

	let allPost: Post[] = []

	if (data) {
		data.forEach(element => {
			allPost = [...allPost, ...element.getNewsFeedPost.posts]
		})
	}

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
			{allPost.map((post: Post) => (
				<SinglePost key={nanoid()} {...post} />
			))}

			{error && 'error happened'}
		</>
	)
}

export default PostsSection
