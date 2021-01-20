import React, { useState, useEffect } from 'react'
import { Formik, Field } from 'formik'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/Button'
import { TextField } from 'formik-material-ui'
import Paper from '@material-ui/core/Paper'
import { nanoid } from 'nanoid'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import useGetPersonal from 'hooks/useGetPersonal'
import createRequest from 'utils/createRequest'
import { mutation } from 'components/AboutSection/NewDetailForm'
import ArrayChips from 'components/arrayChips/arrayChips'

interface Values {
	skills: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center',
			flexWrap: 'wrap',
			listStyle: 'none',
			padding: theme.spacing(0.5),
			margin: 0,
		},
		chip: {
			margin: theme.spacing(0.5),
		},
	})
)

interface Props {
	skills: string[]
	setSkills: Function
}

const ChipsForm = ({ skills, setSkills }: Props) => {
	const classes = useStyles()

	const handleDelete = (chipIndex: number) => () => {
		setSkills((chips: string[]) =>
			chips.filter((chip: string, index: number) => index !== chipIndex)
		)
	}

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
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSkills([values.skills, ...skills])
					setTimeout(() => {
						setSubmitting(false)
						resetForm()
					}, 10)
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

			<ArrayChips skills={skills} deleteChip={handleDelete} />
		</>
	)
}

export default ChipsForm
