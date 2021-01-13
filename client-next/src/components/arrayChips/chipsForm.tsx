import React, { useState, useEffect } from 'react'
import { Formik, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import useGetPersonal from 'hooks/useGetPersonal'
import createRequest from 'utils/createRequest'
import { mutation } from 'components/AboutSection/NewDetailForm'

interface Values {
	skills: string
}

const ChipsForm = () => {
	const userId = '5ff9939e53c3e8c7a2c4a833'
	const {
		data: {
			getPersonal: { skills },
		},
	} = useGetPersonal({ userId })

	const [allSkills, setAllSkills] = useState<string[]>([])

	useEffect(() => {
		if (skills) {
			setAllSkills([...skills])
		}
	}, [])

	return (
		<>
			<Formik
				initialValues={{
					skills: '',
				}}
				validate={values => {
					const errors: Partial<Values> = {}
					if (!values.skills) {
						errors.skills = 'Required'
					}
					return errors
				}}
				onSubmit={(values, { setSubmitting }) => {
					createRequest({
						mutation,
						values: { skills: [...allSkills, values.skills] },
					})

					setTimeout(() => {
						setSubmitting(false)
					}, 500)
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<>
						<Field
							component={TextField}
							type='text'
							label='add a new skill'
							name='skills'
						/>
						{isSubmitting && <LinearProgress />}
						<br />
						<Button
							variant='contained'
							color='primary'
							disabled={isSubmitting}
							onClick={submitForm}
						>
							add
						</Button>
					</>
				)}
			</Formik>

			{allSkills.map((x, y) => (
				<div key={x}>{x}</div>
			))}
		</>
	)
}

export default ChipsForm
