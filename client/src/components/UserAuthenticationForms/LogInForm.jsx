import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { Link as RouterLink } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from 'formik-material-ui'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({}))

const logInUser = (logInData) => {
	return axios.post('/api/user/login', logInData)
}

const LogInForm = () => {
	// const { formContainer } = useStyles()

	return (
		<>
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
				onSubmit={(values, { setSubmitting, resetForm }) => {
					logInUser(values)
						.then(() => resetForm())
						.catch((error) => console.log(error.response))

					setTimeout(() => {
						setSubmitting(false)
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
							Log In
						</Button>

						<br />
					</Form>
				)}
			</Formik>
			<Button
				color='primary'
				size='small'
				component={RouterLink}
				to='/authentication/sign_up'
			>
				Don&apos;t have an account?
			</Button>
		</>
	)
}

export default LogInForm
