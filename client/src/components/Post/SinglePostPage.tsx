import React from 'react'
import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar/Avatar'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { cloudinaryURL } from 'variables/global'

import CommentList from 'components/Comment/CommentList'
import CommentForm from 'components/Forms/CommentForm'

import { useGetSinglePost } from 'hooks/useGetPost'
import { useProfileInfo } from 'hooks/useGetProfileData'
import { useOwnUserId } from 'hooks/userhooks'

import Post from 'interfaces/post'

import SinglePost from './SinglePost'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,

		'& form ': {
			flex: '1 1 auto',
		},
	},
}))

const SinglePostPage = () => {
	const { root } = useStyles()

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

			<List className={root}>
				<ListItem alignItems='flex-start'>
					<ListItemAvatar>
						<Avatar alt={name} src={cloudinaryURL(profilePicture)} />
					</ListItemAvatar>

					<CommentForm {...commentFormProps} />
				</ListItem>
			</List>

			<CommentList {...commentListProps} />
		</>
	)
}

export default SinglePostPage
