import * as React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'

interface Values {
	email: string
	password: string
}

interface Props {
	updateMutation: string
	postId: string
	numberFields: string[]
	fields: string[]
}
function App() {
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validate={values => {
				const errors: Partial<Values> = {}
				if (!values.email) {
					errors.email = 'Required'
				} else if (
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
				) {
					errors.email = 'Invalid email address'
				}
				return errors
			}}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					setSubmitting(false)
					alert(JSON.stringify(values, null, 2))
				}, 500)
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<Field component={TextField} name='email' type='email' label='Email' />
					<br />
					<Field
						component={TextField}
						type='password'
						label='Password'
						name='password'
					/>
					{isSubmitting && <LinearProgress />}
					<br />
					<Button
						variant='contained'
						color='primary'
						disabled={isSubmitting}
						onClick={submitForm}
					>
						update
					</Button>
				</Form>
			)}
		</Formik>
	)
}
