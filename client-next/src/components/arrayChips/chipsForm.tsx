import * as React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'

interface Values {
	skill: string
}

const ChipsForm = () => {
	return (
		<Formik
			initialValues={{
				skill: '',
			}}
			validate={values => {
				const errors: Partial<Values> = {}
				if (!values.skill) {
					errors.skill = 'Required'
				}
				return errors
			}}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					setSubmitting(false)

					// eslint-disable-next-line no-alert
					alert(JSON.stringify(values, null, 2))
				}, 500)
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<Field
						component={TextField}
						type='text'
						label='add a new skill'
						name='skill'
					/>
					{isSubmitting && <LinearProgress />}
					<br />
					<Button
						variant='contained'
						color='primary'
						disabled={isSubmitting}
						onClick={submitForm}
					>
						add
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default ChipsForm
