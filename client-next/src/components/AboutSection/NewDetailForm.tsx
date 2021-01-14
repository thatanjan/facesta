import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { mutate } from 'swr'
import {
	TimePicker,
	DatePicker,
	DateTimePicker,
} from 'formik-material-ui-pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { getPersonalData } from 'graphql/queries/profileQueries'

import { updatePersonal } from 'graphql/mutations/userMutations'
import createRequest from 'utils/createRequest'
import ChipsForm from 'components/arrayChips/chipsForm'

export const mutation = updatePersonal
const NewDetailForm = ({ formFields, doneAdding }: any) => {
	const inputValues: any = {}

	formFields.forEach((item: any) => (inputValues[`${item}`] = ''))

	inputValues.data = new Date()

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Formik
				initialValues={inputValues}
				onSubmit={(values, { setSubmitting }) => {
					const mutation = updatePersonal
					const queries = getPersonalData()
					const userId = '5ff9939e53c3e8c7a2c4a833'

					values.date = values.date.toISOString()

					createRequest({ mutation, values })
					mutate([queries, userId])
					setSubmitting(false)
					doneAdding(false)
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<Field component={DatePicker} name='date' label='Date' />

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

						<ChipsForm />

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
		</MuiPickersUtilsProvider>
	)
}

export default NewDetailForm
