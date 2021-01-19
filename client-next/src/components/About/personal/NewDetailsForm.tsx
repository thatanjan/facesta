import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { DatePicker } from 'formik-material-ui-pickers'
import { TextField } from 'formik-material-ui'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { updatePersonal } from 'graphql/mutations/userMutations'
import useGetPersonal from 'hooks/useGetPersonal'
import { useUserId } from 'hooks/profileContextHooks'
import { PersonalData } from 'interfaces/profile'
import { DATE_OF_BIRTH } from 'utils/global'
import createRequest from 'utils/createRequest'

import { personalDetailsField, doIfDateOfBirthField } from './PersonalDetails'

const ifDateOfBirth = (compare: string) => compare === DATE_OF_BIRTH

const doIfDateOfBirthComponent = (value: string) => {
	if (ifDateOfBirth(value)) {
		return DatePicker
	}

	return TextField
}

interface Props {
	setIsAdding: Function
}

const NewDetailsForm = ({ setIsAdding }: Props) => {
	const userId = useUserId()
	const { data, error } = useGetPersonal({ userId })

	if (error) return <div>...error</div>
	if (!data) return <div>...loading</div>

	const { getPersonal } = data

	const initialData: PersonalData = getPersonal

	personalDetailsField.forEach((item: string) => {
		const value = initialData[`${item}`]
		if (value === null) {
			initialData[item] = ''
		}
	})

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Formik
				initialValues={initialData}
				onSubmit={(values, { setSubmitting }) => {
					createRequest({ mutation: updatePersonal, values })
					setIsAdding(false)
					setTimeout(() => {
						setSubmitting(false)
					}, 500)
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						{personalDetailsField.map((item: string) => (
							<div key={item}>
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
