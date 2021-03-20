import React from 'react'

import PostType from 'interfaces/post'
import SinglePost from 'components/Post/SinglePost'
import useGetAllPosts from 'hooks/useGetPost'
import { nanoid } from 'nanoid'

const Posts = () => {
	const { data, error } = useGetAllPosts(0)

	console.log(data)

	if (!data) return <div>... loading</div>
	if (error) return 'error happened'

	const {
		getAllPost: { posts },
	} = data

	return (
		<div>
			{Array.isArray(posts) &&
				posts.map(({ image, headline, text }: PostType) => {
					const props = {
						image,
						headline,
						text,
						markdown: false,
					}
					return <SinglePost key={nanoid()} {...props} />
				})}{' '}
		</div>
	)
}

export default Posts
