import * as React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import AutoExpandField from 'components/TextFields/AutoExpandField'

interface Values {
	email: string
	password: string
}

function App() {
	return (
		<Formik
			initialValues={{
				comment: '',
			}}
			validate={values => {
				const errors: Partial<Values> = {}
				if (!values.comment) {
					errors.comment = 'Required'
				}
				return errors
			}}
			onSubmit={(values, { setSubmitting }) => {
				console.log(values)
				setTimeout(() => {
					setSubmitting(false)
					alert(JSON.stringify(values, null, 2))
				}, 500)
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<Field component={AutoExpandField} name='comment' />
					<br />
					{isSubmitting && <LinearProgress />}
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

export default App
