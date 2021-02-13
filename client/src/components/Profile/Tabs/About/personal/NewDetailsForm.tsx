import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { DatePicker } from 'formik-material-ui-pickers'
import { TextField } from 'formik-material-ui'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayUtils from '@date-io/dayjs'
import { mutate } from 'swr'

// import ChipsForm from 'components/arrayChips/chipsForm'
import { getPersonalData } from 'graphql/queries/profileQueries'
import { updatePersonal } from 'graphql/mutations/userMutations'
import useGetPersonal from 'hooks/useGetPersonalProfile'
import { useOwnUserId } from 'hooks/userhooks'
import { PersonalData } from 'interfaces/profile'
import { DATE_OF_BIRTH, SKILLS } from 'variables/global'
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
	const ownUserId = useOwnUserId()
	const { data, error } = useGetPersonal(ownUserId)

	if (error) return <div>...error</div>
	if (!data) return <div>...loading</div>

	const { getPersonal } = data

	const initialData = getPersonal

	personalDetailsField.forEach((item: string) => {
		const value = initialData[`${item}`]
		if (value === null) {
			initialData[item] = ''
		}
	})

	const [skills, setSkills] = useState(initialData.skills)

	const chipsProps = { skills, setSkills }

	return (
		<MuiPickersUtilsProvider utils={DayUtils}>
			<Formik
				initialValues={initialData}
				onSubmit={(values, { setSubmitting }) => {
					// eslint-disable-next-line no-param-reassign
					values.skills = skills

					createRequest({ key: updatePersonal, values })
					mutate([getPersonalData(), ownUserId])

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
								{item === SKILLS ? (
									''
								) : (
									<Field
										type='text'
										component={doIfDateOfBirthComponent(item)}
										name={item}
										label={doIfDateOfBirthField(item)}
										placeholder={item}
									/>
								)}
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

						<Button
							variant='contained'
							color='secondary'
							disabled={isSubmitting}
							onClick={() => setIsAdding(false)}
						>
							cancel
						</Button>
					</Form>
				)}
			</Formik>
		</MuiPickersUtilsProvider>
	)
}

// {/* <ChipsForm {...chipsProps} /> */}
export default NewDetailsForm
