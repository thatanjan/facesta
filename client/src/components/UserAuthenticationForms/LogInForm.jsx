import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { Link as RouterLink } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from 'formik-material-ui'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
	formContainer: {
		height: '40vh',
		width: '80vw',
		background: `${theme.palette.primary.contrastText}`,
		justifyContent: 'center',
		alignContent: 'center',

		// to center horizontally
		margin: '0 auto',

		// to center vertically
		top: '50%',
		position: 'relative',
		transform: 'translateY(-50%)',
	},
}))

const logInUser = (logInData) => {
	axios
		.post('/api/user/login', logInData)
		.then((result) => console.log(result))
		.catch((error) => console.log('error'))
}

const LogInForm = () => {
	const { formContainer } = useStyles()

	return (
		<>
			<Grid container className={formContainer}>
				<Formik
					initialValues={{
						email: '',
						password: '',
					}}
					validate={(values) => {
						const errors = {}
						if (!values.email) {
							errors.email = 'Required'
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
						) {
							errors.email = 'Invalid email address'
						}
						return errors
					}}
					onSubmit={(values, { setSubmitting }) => {
						logInUser(values)

						setTimeout(() => {
							setSubmitting(false)
							alert(JSON.stringify(values, null, 2))
						}, 500)
					}}
				>
					{({ submitForm, isSubmitting }) => (
						<Form>
							<Field component={TextField} name='email' type='email' label='Email' />
							<br />
							<Field
								component={TextField}
								type='password'
								label='Password'
								name='password'
							/>
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

							<br />
						</Form>
					)}
				</Formik>
				<Button color='primary' size='small' component={RouterLink} to='/login'>
					Don&apos;t have an account?
				</Button>
			</Grid>
		</>
	)
}

export default LogInForm
