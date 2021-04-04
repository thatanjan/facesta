import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'
import { DatePicker } from 'formik-material-ui-pickers'
import { TextField } from 'formik-material-ui'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayUtils from '@date-io/dayjs'
import { mutate } from 'swr'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
// import ChipsForm from 'components/arrayChips/chipsForm'
import { getPersonalData as getPersonalDataMutation } from 'graphql/queries/profileQueries'
import { updatePersonalData } from 'graphql/mutations/profileMutations'
import useGetPersonal from 'hooks/useGetProfileData'
import { useOwnUserId } from 'hooks/userhooks'
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
	isAdding: boolean
}

const useStyles = makeStyles(() =>
	createStyles({
		inputStyle: {
			width: '100%',
		},
	})
)

const NewDetailsForm = ({ setIsAdding, isAdding }: Props) => {
	const { inputStyle } = useStyles()
	const { data, error } = useGetPersonal()

	const handleClose = () => {
		setIsAdding(false)
	}

	if (error) return <div>...error</div>
	if (!data) return <div>...loading</div>

	console.log(data)
	const { getPersonalData } = data

	const initialData = getPersonalData

	personalDetailsField.forEach((item: string) => {
		const value = initialData[`${item}`]
		if (value === null) {
			initialData[item] = ''
		}
	})

	const [skills, setSkills] = useState(initialData.skills)

	return (
		<Dialog
			open={isAdding}
			onClose={handleClose}
			aria-labelledby='form-dialog-title'
			fullWidth
		>
			<DialogTitle id='form-dialog-title'>Update your information </DialogTitle>

			<MuiPickersUtilsProvider utils={DayUtils}>
				<Formik
					initialValues={initialData}
					onSubmit={(values, { setSubmitting }) => {
						const mutation1 = getPersonalDataMutation('name bio')
						const mutation2 = getPersonalDataMutation()
						// eslint-disable-next-line no-param-reassign
						values.skills = skills

						createRequest({ key: updatePersonalData, values })
						mutate([mutation1, mutation2])
						mutate([mutation2, mutation2])

						setIsAdding(false)
						setTimeout(() => {
							setSubmitting(false)
						}, 500)
					}}
				>
					{({ submitForm, isSubmitting }) => (
						<Form>
							<DialogContent>
								{personalDetailsField.map((item: string) => (
									<Box key={item}>
										{item === SKILLS ? (
											''
										) : (
											<Field
												className={inputStyle}
												type='text'
												component={doIfDateOfBirthComponent(item)}
												name={item}
												label={doIfDateOfBirthField(item)}
												placeholder={item}
											/>
										)}
									</Box>
								))}

								<br />
								{isSubmitting && <LinearProgress />}
								<br />

								<DialogActions>
									<Button disabled={isSubmitting} onClick={handleClose} color='primary'>
										Cancel
									</Button>
									<Button disabled={isSubmitting} onClick={submitForm} color='primary'>
										Submit
									</Button>
								</DialogActions>
							</DialogContent>{' '}
						</Form>
					)}
				</Formik>
			</MuiPickersUtilsProvider>
		</Dialog>
	)
}

export default NewDetailsForm
