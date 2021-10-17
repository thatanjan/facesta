import React from 'react'
import dynamic from 'next/dynamic'
import { Formik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'
import { TextField } from 'formik-material-ui'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import CircularLoader from 'components/Loaders/CircularLoader'

import { updatePersonalData } from 'graphql/mutations/profileMutations'
import { useGetPersonalData } from 'hooks/useGetProfileData'

import { useUserID } from 'redux/hooks/stateHooks'

import { DATE_OF_BIRTH } from 'variables/global'
import createRequest from 'utils/createRequest'

import { personalDetailsField, generateField } from './PersonalDetails'

const AutoExpandField = dynamic(
	() => import('components/TextFields/AutoExpandField')
)

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

interface Props {
	setIsAdding: Function
	isAdding: boolean
}

const useStyles = makeStyles(() =>
	createStyles({
		inputStyle: {
			width: '100%',
			marginBottom: '1rem',
			'& label': { textTransform: 'capitalize' },
		},
	})
)

const NewDetailsForm = ({ setIsAdding, isAdding }: Props) => {
	const { inputStyle } = useStyles()
	const userID = useUserID()

	const { data, error, mutate } = useGetPersonalData(userID)

	const handleClose = () => {
		setIsAdding(false)
	}

	if (error) return <SwrErrorAlert />
	if (!data) return <CircularLoader />

	const { getPersonalData } = data

	const initialData = getPersonalData

	personalDetailsField.forEach((item: string) => {
		const value = initialData[item]
		if (value === null) {
			initialData[item] = ''
		}

		if (item === DATE_OF_BIRTH && value) {
			const date = new Date(initialData[item])

			initialData[item] = date.toLocaleDateString().split('/').join('-')
		}
	})

	return (
		<Dialog
			open={isAdding}
			onClose={handleClose}
			aria-labelledby='form-dialog-title'
			fullWidth
		>
			<DialogTitle id='form-dialog-title'>Update your information </DialogTitle>

			<Formik
				initialValues={initialData}
				validate={values => {
					const errors: Partial<any> = {}

					const { name, website, dateOfBirth } = values

					if (name.length < 6 || name.length > 30) {
						errors.name = 'Name should be under 6 to 30 characters long'
					}

					const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(website)

					if (!validUrl) {
						errors.website = 'Website url is not valid'
					}

					if (website === '') {
						delete errors.website
					}

					if (dateOfBirth === '') return errors

					const date = new Date(dateOfBirth)

					if (date.toDateString() === 'Invalid Date')
						errors.dateOfBirth = 'Invalid Date'

					if (!(date instanceof Date && !Number.isNaN(date))) {
						errors.dateOfBirth = "Invalid date. Try using 'mm-dd-yyyy'"
					}
					return errors
				}}
				onSubmit={async (values, { setSubmitting }) => {
					// eslint-disable-next-line no-param-reassign

					const FormValues = values

					if (!FormValues.dateOfBirth) {
						FormValues.dateOfBirth = null
					} else {
						FormValues.dateOfBirth = new Date(FormValues.dateOfBirth).toISOString()
					}

					const res = await createRequest({
						key: updatePersonalData,
						values: FormValues,
					})

					if (res) {
						mutate()

						setTimeout(() => {
							setIsAdding(false)
							setSubmitting(false)
						}, 500)
					}
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<DialogContent>
							{personalDetailsField.map((item: string) => (
								<Box key={item}>
									<Field
										className={inputStyle}
										type='text'
										component={item === 'bio' ? AutoExpandField : TextField}
										name={item}
										label={generateField(item)}
										placeholder={
											item === DATE_OF_BIRTH ? "Use 'mm-dd-yyyy' format" : item
										}
									/>
									<br />
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
		</Dialog>
	)
}

export default NewDetailsForm
