import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { TextField } from 'formik-material-ui'

import { registerUserAction } from 'redux/actions/authActions'

// signing up the user
const signUpUser = (registerAction, signUpInformation) => {
	registerAction(signUpInformation)
}

const SignUpForm = ({ registerUser }) => {
	return (
		<>
			{/* <Grid container className={formContainer}> */}
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
				style={{
					paddingBottom: '1rem',
				}}
			>
				have an account?
			</Button>
			{/*  	</Grid> */}
		</>
	)
}

SignUpForm.propTypes = {
	registerUser: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
	registerUser: payload => dispatch(registerUserAction(payload)),
})

export default connect(null, mapDispatchToProps)(SignUpForm)
