import React from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button'
import { TextField } from 'formik-material-ui'

interface Values {
	text: string
}
const SearchForm = () => {
	const { push } = useRouter()
	return (
		<Formik
			initialValues={{
				text: '',
			}}
			validate={values => {
				const errors: Partial<Values> = {}
				if (!values.text) {
					errors.text = 'Required'
				}
				return errors
			}}
			onSubmit={({ text }) => {
				const queryText = text.replace(/\s+/g, ' ').trim().replace(/\s+/g, '-')

				push(`/search/${queryText}`)
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form style={{ margin: '2rem' }}>
					<Field
						fullWidth
						component={TextField}
						name='text'
						type='text'
						label='Search user'
						style={{ marginBottom: '0.5rem' }}
					/>
					<br />
					<Button
						variant='contained'
						color='primary'
						disabled={isSubmitting}
						onClick={submitForm}
						size='small'
					>
						Search
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default SearchForm
