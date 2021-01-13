import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { List } from 'immutable'

interface Values {
	skill: string
}

const ChipsForm = () => {
	const [allSkills, setAllSkills] = useState<string[]>([])
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

						// eslint-disable-next-line no-alert
						alert(JSON.stringify(skill, null, 2))
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
