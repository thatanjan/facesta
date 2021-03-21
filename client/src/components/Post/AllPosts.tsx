import React from 'react'
import { nanoid } from 'nanoid'

import Post from 'interfaces/post'
import SinglePost from 'components/Post/SinglePost'
import { useGetNewsFeedPost } from 'hooks/useGetPost'

const PostsSection = () => {
	const { data, error } = useGetNewsFeedPost(0)

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const {
		getNewsFeedPost: { posts },
	} = data

	return (
		<>
			{posts.map((post: Post) => (
				<SinglePost key={nanoid()} {...post} />
			))}
		</>
	)
}

export default PostsSection
