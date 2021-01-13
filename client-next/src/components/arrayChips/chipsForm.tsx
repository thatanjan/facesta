import React, { useState, useEffect } from 'react'
import { Formik, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import useGetPersonal from 'hooks/useGetPersonal'

interface Values {
	skill: string
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
					skill: '',
				}}
				validate={values => {
					const errors: Partial<Values> = {}
					if (!values.skill) {
						errors.skill = 'Required'
					}
					return errors
				}}
				onSubmit={({ skill }, { setSubmitting }) => {
					setTimeout(() => {
						setAllSkills([...allSkills, skill])
						allSkills.push(skill)
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
							name='skill'
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
