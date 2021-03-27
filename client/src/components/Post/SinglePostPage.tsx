import React from 'react'
import { useRouter } from 'next/router'

import CommentList from 'components/Comment/CommentList'
import { useGetSinglePost } from 'hooks/useGetPost'
import Post from 'interfaces/post'
import SinglePost from './SinglePost'

const SinglePostPage = () => {
	const {
		query: { post: postID, postUser },
	} = useRouter()

	const { data, error } = useGetSinglePost({
		user: postUser as string,
		postID: postID as string,
	})

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const commentListProps = {
		postID: postID as string,
		postUserID: postUser as string,
	}

	const {
		getSinglePost: { post },
	} = data

	return (
		<>
			<SinglePost {...(post as Post)} postPage />
			<CommentList {...commentListProps} />
		</>
	)
}

export default SinglePostPage
