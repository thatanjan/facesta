import React from 'react'
import { nanoid } from 'nanoid'
import InfiniteScroll from 'react-infinite-scroll-component'

import Post from 'interfaces/post'
import SinglePost from 'components/Post/SinglePost'
import useGetAllPosts from 'hooks/useGetPost'
import { useProfileInfo } from 'hooks/useGetProfileData'

const Posts = () => {
	const { data, error, size, setSize } = useGetAllPosts()
	const { data: profileData, error: profileError } = useProfileInfo()
	console.log(data)

	if (profileError || error) return <div>failed to load</div>
	if (!data || !profileData) return <div>loading...</div>

	const { getUser: user } = profileData

	let isLoadingMore = true
	let allPost: Post[] = []

	if (data) {
		if (data[size - 1]) {
			if (data[size - 1].getNewsFeedPost?.posts.length === 0) {
				isLoadingMore = false
			}
		}

		data.forEach(element => {
			allPost = [...allPost, ...element.getAllPost.posts]
		})
	}

	return (
		<div>
			<InfiniteScroll
				dataLength={allPost.length}
				next={() => setSize(size + 1)}
				hasMore={isLoadingMore as boolean}
				loader={<h4>Loading...</h4>}
			>
				{allPost.map((post: Post) => (
					<SinglePost key={nanoid()} {...post} postPage={false} user={user} />
				))}
			</InfiniteScroll>

			{error && 'error happened'}
		</div>
	)
}

export default Posts
