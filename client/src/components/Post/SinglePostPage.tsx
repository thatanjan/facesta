import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { makeStyles, Theme } from '@material-ui/core/styles'

import CircularLoader from 'components/Loaders/CircularLoader'
import { useStyles as useFormStyle } from 'components/Comment/CommentList'
import UserAvatar from 'components/Avatars/UserAvatar'

import { useGetSinglePost } from 'hooks/useGetPost'
import { useGetPersonalData } from 'hooks/useGetProfileData'
import { useUserID } from 'redux/hooks/stateHooks'

import Post from 'interfaces/post'

const Alert = dynamic(() => import('components/Alerts/Alert'))

const CommentList = dynamic(() => import('components/Comment/CommentList'), {
	loading: () => <CircularLoader />,
})

const CommentForm = dynamic(() => import('components/Forms/CommentForm'))

const SinglePost = dynamic(() => import('./SinglePost'))

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

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
	const [newCommentAdded, setNewCommentAdded] = useState(false)
	const [showAlert, setShowAlert] = useState(false)

	const { root } = useStyles()
	const { listItemStyle } = useFormStyle()

	const ownUserID = useUserID()
	const {
		query: { post: postID, postUser },
	} = useRouter()

	const { data, error } = useGetSinglePost({
		postID: postID as string,
	})

	const { data: myData, error: myError } = useGetPersonalData(ownUserID)

	useEffect(() => {
		if (newCommentAdded) {
			setTimeout(() => {
				setNewCommentAdded(false)
			}, 2000)
		}
	}, [newCommentAdded])

	if (error || myError) return <SwrErrorAlert />
	if (!data || !myData) return <CircularLoader />

	const commentListProps = {
		postID: postID as string,
		postUserID: postUser as string,
		newCommentAdded,
	}

	const {
		getSinglePost: { post },
	} = data

	const {
		getPersonalData: { name, profilePicture },
	} = myData

	const commentFormProps = {
		postID: postID as string,
		ownUserID,
		setNewCommentAdded,
		postUserID: postUser as string,
		setShowAlert,
	}

	return (
		<>
			<SinglePost {...(post as Post)} postPage />

			{showAlert && (
				<Alert checked severity='error' message='Posting comment failed' />
			)}

			<List className={root}>
				<ListItem alignItems='flex-start' className={listItemStyle}>
					<ListItemAvatar>
						<UserAvatar
							alt={name}
							imageID={profilePicture}
							href={`/profile/${post.user._id}`}
						/>
					</ListItemAvatar>

					<CommentForm {...commentFormProps} />
				</ListItem>
			</List>

			<CommentList {...commentListProps} />
		</>
	)
}

export default SinglePostPage
