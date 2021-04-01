import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar/Avatar'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import { cloudinaryURL } from 'variables/global'

import CommentList from 'components/Comment/CommentList'
import CommentForm from 'components/Forms/CommentForm'

import { useGetSinglePost } from 'hooks/useGetPost'
import { useProfileInfo } from 'hooks/useGetProfileData'
import { useOwnUserId } from 'hooks/userhooks'

import Post from 'interfaces/post'

import SinglePost from './SinglePost'

const useStyles = makeStyles({
	buttonStyle: { margin: '2% 0' },
	avatarStyle: { margin: '0 auto' },
	avatarContainerStyle: {
		alignSelf: 'center',
		marginBottom: '5%',
	},
})

const SinglePostPage = () => {
	const { avatarStyle, avatarContainerStyle } = useStyles()

	const ownUserID = useOwnUserId()
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

	const commentFormProps = { postID: postID as string, ownUserID }

	return (
		<>
			<SinglePost {...(post as Post)} postPage />
			<Grid container alignItems='center'>
				<Grid item xs={2} md={1} className={avatarContainerStyle}>
					<Avatar
						alt={name}
						src={cloudinaryURL(profilePicture)}
						className={avatarStyle}
					/>
				</Grid>
				<Grid item xs={10}>
					<CommentForm {...commentFormProps} />
				</Grid>
			</Grid>

			<CommentList {...commentListProps} />
		</>
	)
}

export default SinglePostPage
