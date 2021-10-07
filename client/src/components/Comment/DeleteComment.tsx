import React, { useState } from 'react'
import { mutate } from 'swr'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { removeCommentPost } from 'graphql/mutations/postMutations'
import { getTotalComments } from 'graphql/queries/postQueries'

import createRequest from 'utils/createRequest'

import { CommentActionProps, Transition } from './Comment'

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

export default DeleteButton
