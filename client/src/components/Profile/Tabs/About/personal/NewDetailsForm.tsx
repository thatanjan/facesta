import React from 'react'
import dynamic from 'next/dynamic'
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
import { createStyles, makeStyles } from '@material-ui/core/styles'

import CircularLoader from 'components/Loaders/CircularLoader'

import { updatePersonalData } from 'graphql/mutations/profileMutations'
import { useGetPersonalData } from 'hooks/useGetProfileData'
import { useOwnUserId } from 'hooks/userhooks'
import { DATE_OF_BIRTH } from 'variables/global'
import createRequest from 'utils/createRequest'

import { personalDetailsField, generateField } from './PersonalDetails'

const AutoExpandField = dynamic(
	() => import('components/TextFields/AutoExpandField'),
	{ loading: () => <CircularLoader /> }
)

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

const fieldComponent = (value: string) => {
	if (value === DATE_OF_BIRTH) {
		return DatePicker
	}

	if (value === 'bio') {
		return AutoExpandField
	}

	return TextField
}

const fieldComponentProps = (value: string) => {
	if (value === DATE_OF_BIRTH) {
		return {
			autoOk: true,
			orientatio: 'landscape',
			variant: 'static',
			openTo: 'date',
		}
	}

	if (value === 'bio') {
		return {}
	}

	return {}
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
	const userID = useOwnUserId()

	const { data, error, mutate } = useGetPersonalData(userID)

	const handleClose = () => {
		setIsAdding(false)
	}

	if (error) return <SwrErrorAlert />
	if (!data) return <CircularLoader />

	const { getPersonalData } = data

	const initialData = getPersonalData

	personalDetailsField.forEach((item: string) => {
		const value = initialData[`${item}`]
		if (value === null) {
			initialData[item] = ''
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

			<MuiPickersUtilsProvider utils={DayUtils}>
				<Formik
					initialValues={initialData}
					onSubmit={async (values, { setSubmitting }) => {
						// eslint-disable-next-line no-param-reassign

						const FormValues = values

						if (FormValues.dateOfBirth === '') {
							delete FormValues.dateOfBirth
						}

						if (typeof FormValues.dateOfBirth === 'object') {
							FormValues.dateOfBirth = FormValues.dateOfBirth.$d.toISOString()
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
											component={fieldComponent(item)}
											name={item}
											label={generateField(item)}
											placeholder={item}
											{...fieldComponentProps(item)}
										/>
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
