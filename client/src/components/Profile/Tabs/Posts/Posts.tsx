import React from 'react'

import PostType from 'interfaces/post'
import SinglePost from 'components/Post/SinglePost'
import useGetAllPosts from 'hooks/useGetPost'
import { nanoid } from 'nanoid'

const Posts = () => {
	const { data, error } = useGetAllPosts()

	if (!data) return <div>... loading</div>
	if (error) return 'error happened'

	let allPost: PostType[] = []

	if (data) {
		data.forEach(element => {
			allPost = [...allPost, ...element.getAllPost.posts]
		})
	}
	console.log(allPost)

	return (
		<div>
			{Array.isArray(allPost) &&
				allPost.map((post: PostType) => (
					<SinglePost key={nanoid()} {...post} postPage={false} />
				))}
		</div>
	)
}

export default Posts
