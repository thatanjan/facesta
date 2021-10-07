import React, { useState } from 'react'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Box from '@material-ui/core/Box'
import Slide, { SlideProps } from '@material-ui/core/Slide'

import { Comment } from 'interfaces/post'

import MuiLink from 'components/Links/MuiLink'
import UserAvatar from 'components/Avatars/UserAvatar'

import { removeCommentPost } from 'graphql/mutations/postMutations'
import { getTotalComments } from 'graphql/queries/postQueries'

import createRequest from 'utils/createRequest'

export const Transition = React.forwardRef(function Transition(
	props: SlideProps,
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />
})

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

export interface CommentActionProps {
	userID: string
	postID: string
	commentID: string
	mutateCommentsList: Function
}

const DeleteButton = ({
	postID,
	commentID,
	mutateCommentsList,
}: CommentActionProps) => {
	const [showDialog, setShowDialog] = useState(false)
	const handleDelete = async () => {
		const {
			removeCommentPost: { message },
		} = await createRequest({
			values: { commentID, postID },
			key: removeCommentPost,
		})

		if (message) {
			mutate([getTotalComments, postID])
			mutateCommentsList()
			setShowDialog(false)
		}
	}

	return (
		<>
			<IconButton edge='end' onClick={() => setShowDialog(true)}>
				<DeleteIcon />
			</IconButton>

			{showDialog && (
				<Dialog open={showDialog} TransitionComponent={Transition} keepMounted>
					<DialogTitle id='alert-dialog-slide-title'>
						Do you want to Delete the comment?
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-slide-description'>
							If you Delete the comment, you will never be able recover this comment.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setShowDialog(false)} color='primary'>
							Cancel
						</Button>
						<Button onClick={handleDelete} color='primary'>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</>
	)
}

const CommentAction = (props: CommentActionProps) => {
	return (
		<ListItemSecondaryAction>
			<IconButton edge='end'>
				<EditIcon />
			</IconButton>

			<DeleteButton {...props} />
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
