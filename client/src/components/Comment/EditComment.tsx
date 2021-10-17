import React, { useState } from 'react'
import cookie from 'js-cookie'
import dynamic from 'next/dynamic'
import { Formik, Form, Field } from 'formik'
import { mutate } from 'swr'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'

import { editCommentPost } from 'graphql/mutations/postMutations'
import { getTotalComments } from 'graphql/queries/postQueries'

import createRequest from 'utils/createRequest'

import { CommentActionProps, Transition } from './Comment'

const AutoExpandField = dynamic(
	() => import('components/TextFields/AutoExpandField')
)

interface Values {
	comment: string
}

const EditComment = ({
	postID,
	commentID,
	mutateCommentsList,
	text,
}: CommentActionProps) => {
	const [showDialog, setShowDialog] = useState(false)
	const fieldName = 'comment'

	return (
		<>
			<IconButton edge='end' onClick={() => setShowDialog(true)}>
				<EditIcon />
			</IconButton>

			{showDialog && (
				<Formik
					initialValues={{ comment: text }}
					validate={(values: Values) => {
						const errors: Partial<Values> = {}
						if (!values.comment) errors.comment = 'Required'

						if (values.comment === text) errors.comment = 'Please edit your comment.'

						return errors
					}}
					onSubmit={async ({ comment }) => {
						const {
							editComment: { message },
						} = await createRequest({
							values: { commentID, postID, text: comment },
							key: editCommentPost,
						})

						if (message) {
							mutate([getTotalComments, postID])
							mutateCommentsList()
							setShowDialog(false)
							cookie.remove(fieldName)
						}
					}}
				>
					{({ submitForm, isSubmitting }) => (
						<Form>
							<Dialog
								open={showDialog}
								TransitionComponent={Transition}
								keepMounted
								fullWidth
								maxWidth='sm'
							>
								<DialogTitle id='alert-dialog-slide-title'>Edit Comment</DialogTitle>
								<DialogContent>
									<Field component={AutoExpandField} name={fieldName} />
								</DialogContent>
								<DialogActions>
									<Button
										onClick={() => {
											setShowDialog(false)
											cookie.remove(fieldName)
										}}
										color='primary'
										disabled={isSubmitting}
									>
										Discard
									</Button>
									<Button onClick={submitForm} color='primary' disabled={isSubmitting}>
										Apply
									</Button>
								</DialogActions>
							</Dialog>
						</Form>
					)}
				</Formik>
			)}
		</>
	)
}

export default EditComment
