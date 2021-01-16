import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, DialogTitle, LinearProgress } from '@material-ui/core'
import { DatePicker } from 'formik-material-ui-pickers'
import { TextField } from 'formik-material-ui'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import useGetPersonal from 'hooks/useGetPersonal'
import { useUserId } from 'hooks/profileContextHooks'
import { PersonalData } from 'interfaces/profile'
import { DATE_OF_BIRTH } from 'utils/global'
import { nanoid } from 'nanoid'

import { personalDetailsField, doIfDateOfBirthField } from './PersonalDetails'

const ifDateOfBirth = (compare: string) => compare === DATE_OF_BIRTH

const doIfDateOfBirthComponent = (value: string) => {
	if (ifDateOfBirth(value)) {
		return DatePicker
	}

	return TextField
}

const NewDetailsForm = () => {
	const userId = useUserId()
	const { data, error } = useGetPersonal({ userId })

	if (error) return <div>...error</div>
	if (!data) return <div>...loading</div>

	const { getPersonal } = data

	const initialData: PersonalData = getPersonal

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Formik
				initialValues={initialData}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						setSubmitting(false)
					}, 500)
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						{personalDetailsField.map((item: string) => (
							<div key={nanoid()}>
								<Field
									type='text'
									component={doIfDateOfBirthComponent(item)}
									name={item}
									label={doIfDateOfBirthField(item)}
									placeholder={item}
								/>
							</div>
						))}

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
		</MuiPickersUtilsProvider>
	)
}

export default NewDetailsForm
