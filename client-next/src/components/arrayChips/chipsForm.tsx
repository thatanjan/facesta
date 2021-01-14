import React, { useState, useEffect } from 'react'
import { Formik, Field } from 'formik'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/Button'
import { TextField } from 'formik-material-ui'
import useGetPersonal from 'hooks/useGetPersonal'
import createRequest from 'utils/createRequest'
import { mutation } from 'components/AboutSection/NewDetailForm'
import Paper from '@material-ui/core/Paper'
import { nanoid } from 'nanoid'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

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

const ChipsForm = () => {
	const classes = useStyles()

	const userId = '5ff9939e53c3e8c7a2c4a833'

	const {
		data: {
			getPersonal: { skills },
		},
	} = useGetPersonal({ userId })

	const [allSkills, setAllSkills] = useState<string[]>([])

	const handleDelete = (chipToDelete: string, chipIndex: number) => () => {
		setAllSkills(chips => chips.filter((chip, index) => index !== chipIndex))
	}

	useEffect(() => {
		if (skills) {
			setAllSkills([...skills])
		}
		console.log(skills)
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

			<Paper component='ul' className={classes.root}>
				{allSkills.map((data: string, index: number) => {
					return (
						<li key={nanoid()}>
							{data}
							{/* <Chip */}
							{/* 	label={data} */}
							{/* 	onDelete={handleDelete(data, index)} */}
							{/* 	className={classes.chip} */}
							{/* 	href='' */}
							{/* 	component='span' */}
							{/* /> */}
						</li>
					)
				})}
			</Paper>
		</>
	)
}

export default ChipsForm
