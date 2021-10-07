import React from 'react'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Box from '@material-ui/core/Box'

import { Comment } from 'interfaces/post'

import MuiLink from 'components/Links/MuiLink'
import UserAvatar from 'components/Avatars/UserAvatar'

import { removeCommentPost } from 'graphql/mutations/postMutations'
import { getAllComments, getTotalComments } from 'graphql/queries/postQueries'

import createRequest from 'utils/createRequest'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		listItemStyle: {
			[theme.breakpoints.down('xs')]: {
				paddingLeft: '5px',
				paddingRight: '5px',
			},
		},
		dividerStyle: {
			[theme.breakpoints.down('xs')]: {
				marginLeft: '61px',
			},
		},
	})
)

interface CommentActionProps {
	userID: string
	postID: string
	commentID: string
	mutateCommentsList: Function
}

const CommentAction = ({
	userID,
	postID,
	commentID,
	mutateCommentsList,
}: CommentActionProps) => {
	const handleDelete = async () => {
		const {
			removeCommentPost: { message, errorMessage },
		} = await createRequest({
			values: { commentID, postID },
			key: removeCommentPost,
		})

		if (message) {
			mutate([getTotalComments, postID])
			mutateCommentsList()
		}
	}

	return (
		<ListItemSecondaryAction>
			<IconButton edge='end'>
				<EditIcon />
			</IconButton>

			<IconButton edge='end' onClick={handleDelete}>
				<DeleteIcon />
			</IconButton>
		</ListItemSecondaryAction>
	)
}

interface Props extends Comment {
	mutateCommentsList: Function
}
const SingleComment = ({
	date,
	text,
	user: {
		_id,
		profile: { name, profilePicture },
	},
	_id: commentID,
	mutateCommentsList,
}: Props) => {
	const { listItemStyle, dividerStyle } = useStyles()

	const {
		query: { post: postID },
	} = useRouter()

	return (
		<>
			<ListItem alignItems='flex-start' className={listItemStyle}>
				<CommentAction
					userID={_id}
					postID={postID as string}
					commentID={commentID}
					mutateCommentsList={mutateCommentsList}
				/>
				<ListItemAvatar>
					<UserAvatar alt={name} imageID={profilePicture} href={`/profile/${_id}`} />
				</ListItemAvatar>

				<ListItemText
					primaryTypographyProps={{
						variant: 'h6',
					}}
					secondaryTypographyProps={{
						component: Box,
					}}
					primary={
						<MuiLink
							href={`/profile/${_id}`}
							MuiComponent={Typography}
							color='textPrimary'
						>
							{name}
						</MuiLink>
					}
					secondary={
						<>
							<Typography variant='body2' color='textPrimary'>
								{new Date(date).toDateString()}
							</Typography>
							<Typography variant='subtitle1' color='textPrimary'>
								{text}
							</Typography>
						</>
					}
				/>
			</ListItem>
			<Divider variant='inset' component='li' className={dividerStyle} />
		</>
	)
}

export default SingleComment
