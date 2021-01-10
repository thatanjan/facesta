import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'

import { updatePersonal } from 'graphql/mutations/userMutations'
import createRequest from 'utils/createRequest'

const NewDetailForm = ({ formFields, doneAdding }: any) => {
	const inputValues: any = {}

	formFields.forEach((item: any) => (inputValues[`${item}`] = ''))

	return (
		<Formik
			initialValues={inputValues}
			onSubmit={(values, { setSubmitting }) => {
				const mutation = updatePersonal('website')

				console.log(mutation)
				createRequest({ mutation, values })
				setSubmitting(false)
				doneAdding(false)
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					{formFields.map((item: any) => (
						<div key={item}>
							<Field
								type='text'
								component={TextField}
								name={item}
								placeholder={item}
								label={item}
							/>
							<br />
						</div>
					))}

					{isSubmitting && <LinearProgress />}

					<br />

					<Button
						variant='contained'
						color='primary'
						disabled={isSubmitting}
						onClick={submitForm}
					>
						done
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default NewDetailForm
