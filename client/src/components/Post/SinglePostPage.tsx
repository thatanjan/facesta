import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar/Avatar'

import { cloudinaryURL } from 'variables/global'
import CommentList from 'components/Comment/CommentList'
import { useGetSinglePost } from 'hooks/useGetPost'
import { useProfileInfo } from 'hooks/useGetProfileData'
import { useOwnUserId } from 'hooks/userhooks'
import Post from 'interfaces/post'
import CommentTextField from './CreatePost/PostTextField'
import SinglePost from './SinglePost'

const SinglePostPage = () => {
	const ownUserID = useOwnUserId()
	const [inputText, setInputText] = useState('')
	const {
		query: { post: postID, postUser },
	} = useRouter()

	const { data, error } = useGetSinglePost({
		user: postUser as string,
		postID: postID as string,
	})

	const {
		data: profilePictureData,
		error: profilePictureError,
	} = useProfileInfo(ownUserID)

	if (error || profilePictureError) return <div>failed to load</div>
	if (!data || !profilePictureData) return <div>loading...</div>

	const commentListProps = {
		postID: postID as string,
		postUserID: postUser as string,
	}

	const {
		getSinglePost: { post },
	} = data

	const {
		getUser: {
			name,
			profile: { profilePicture },
		},
	} = profilePictureData

	return (
		<>
			<SinglePost {...(post as Post)} postPage />
			<Avatar alt={name} src={cloudinaryURL(profilePicture)} />
			<CommentTextField {...{ cookieName: 'comment', inputText, setInputText }} />

			<CommentList {...commentListProps} />
		</>
	)
}

export default SinglePostPage
