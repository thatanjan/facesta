import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar/Avatar'
import Grid from '@material-ui/core/Grid'

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
			<Grid container>
				<Grid item xs={1} alignItems='center'>
					<Avatar alt={name} src={cloudinaryURL(profilePicture)} />
				</Grid>
				<Grid item xs={11}>
					<CommentTextField
						{...{ cookieName: 'comment', inputText, setInputText }}
					/>
				</Grid>
			</Grid>

			<CommentList {...commentListProps} />
		</>
	)
}

export default SinglePostPage
