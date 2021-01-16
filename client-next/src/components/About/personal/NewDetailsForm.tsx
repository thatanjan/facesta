import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import {
	TimePicker,
	DatePicker,
	DateTimePicker,
} from 'formik-material-ui-pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

// Depending on the library you picked
import DateFnsUtils from '@date-io/date-fns'

import useGetPersonal from 'hooks/useGetPersonal'
import { useUserId } from 'hooks/profileContextHooks'

interface Props {}

const NewDetailsForm = (props: Props) => {
	const userId = useUserId()
	const { data, error } = useGetPersonal({ userId })

	if (error) return <div>...error</div>
	if (!data) return <div>...loading</div>

	const { getPersonal } = data

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Formik
				initialValues={{
					date: new Date(),
					time: new Date(),
					dateTime: new Date(),
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
						<Field component={TimePicker} name='time' label='Time' />
						<br />
						<Field component={DatePicker} name='date' label='Date' />
						<br />
						<Field component={DateTimePicker} name='dateTime' label='Date Time' />
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
		</MuiPickersUtilsProvider>
	)
}

export default NewDetailsForm
