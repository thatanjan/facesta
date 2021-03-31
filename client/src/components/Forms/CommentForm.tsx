import * as React from 'react'
import { Formik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button'
import Cookies from 'js-cookie'

import AutoExpandField from 'components/TextFields/AutoExpandField'

import createRequest from 'utils/createRequest'
import { commentPost } from 'graphql/mutations/postMutations'

interface Values {
	comment: ''
}

interface Props {
	postID: string
	ownUserID: string
}

function CommentForm({ postID, ownUserID }: Props) {
	return (
		<Formik
			initialValues={{
				comment: Cookies.get('comment') || '',
			}}
			validate={(values: Values) => {
				const errors: Partial<Values> = {}
				if (!values.comment) {
					errors.comment = 'Required'
				}
				return errors
			}}
			onSubmit={async ({ comment }, { setSubmitting }) => {
				const values = { text: comment, postID, user: ownUserID }
				const res = await createRequest({ key: commentPost, values })

				if (res) {
					console.log(res)
				}
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<Field component={AutoExpandField} name='comment' />
					<br />
					{isSubmitting && <div>Submitting</div>}
					<br />
					<Button
						variant='contained'
						color='primary'
						disabled={isSubmitting}
						onClick={submitForm}
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default CommentForm
