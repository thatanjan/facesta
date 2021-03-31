import React from 'react'

import PostType from 'interfaces/post'
import SinglePost from 'components/Post/SinglePost'
import useGetAllPosts from 'hooks/useGetPost'
import { useProfileInfo } from 'hooks/useGetProfileData'
import { nanoid } from 'nanoid'

const Posts = () => {
	const { data, error } = useGetAllPosts()
	const { data: profileData, error: profileError } = useProfileInfo()
	console.log(data)

	if (profileError || error) return <div>failed to load</div>
	if (!data || !profileData) return <div>loading...</div>

	const { getUser: user } = profileData

	let allPost: PostType[] = []

	if (data) {
		data.forEach(element => {
			allPost = [...allPost, ...element.getAllPost.posts]
		})
	}

	return (
		<div>
			{Array.isArray(allPost) &&
				allPost.map((post: PostType) => (
					<SinglePost key={nanoid()} {...post} postPage={false} user={user} />
				))}
		</div>
	)
}

export default Posts
