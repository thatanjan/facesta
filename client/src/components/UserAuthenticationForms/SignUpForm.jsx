import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { Link as RouterLink } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from 'formik-material-ui'
import axios from 'axios'

import { registerUser } from 'redux/actions/authActions'

const useStyles = makeStyles(theme => ({
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

const signUpUser = (registerAction, signUpInformation) => {
	registerAction(signUpInformation)
	axios
		.post('/api/user/register', signUpInformation)
		.then(res => console.log(res))
		.catch(err => console.log(err))
}

const SignUpForm = ({ registerUser }) => {
	const { formContainer } = useStyles()
	return (
		<>
			<Grid container className={formContainer}>
				<Formik
					initialValues={{
						name: '',
						email: '',
						password: '',
						confirmPassword: '',
					}}
					validate={({ email, password, confirmPassword, name }) => {
						const errors = {}

						if (!name) {
							errors.name = 'Required'
						}

						if (name.length < 5 && name.length > 15) {
							errors.name = 'user name length should be 5 - 15'
						}

						if (!email) {
							errors.email = 'Required'
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
							errors.email = 'Invalid email address'
						}

						if (!password) {
							errors.password = 'Required'
						}

						if (password.length < 6) {
							errors.password = 'password must be 6 characters long'
						}

						if (!confirmPassword) {
							errors.confirmPassword = 'Required'
						}

						if (password !== confirmPassword) {
							errors.confirmPassword = 'passwords doesn&apos;t match'
						}

						return errors
					}}
					onSubmit={(values, { setSubmitting }) => {
						signUpUser(registerUser, values)
						// console.log(values)
						setTimeout(() => {
							setSubmitting(false)
						}, 500)
					}}
				>
					{({ submitForm, isSubmitting }) => (
						<Form>
							<Field component={TextField} name='name' type='text' label='User Name' />
							<Field component={TextField} name='email' type='email' label='Email' />
							<br />
							<Field
								component={TextField}
								type='password'
								label='Password'
								name='password'
							/>
							<Field
								component={TextField}
								type='password'
								label='Confirm Password'
								name='confirmPassword'
							/>

							{isSubmitting && <LinearProgress />}
							<br />
							<Button
								variant='contained'
								color='primary'
								disabled={isSubmitting}
								onClick={submitForm}
							>
								Register
							</Button>

							<br />
						</Form>
					)}
				</Formik>
				<Button
					color='primary'
					size='small'
					component={RouterLink}
					to='/authentication/login'
				>
					have an account?
				</Button>
			</Grid>
		</>
	)
}

export default connect(null, { registerUser })(SignUpForm)
