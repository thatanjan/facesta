import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { TextField } from 'formik-material-ui'

import { loginUserAction } from 'redux/actions/authActions'

const LogInForm = ({ logInUser }) => {
	return (
		<>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validate={values => {
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
					// .then(() => resetForm())
					// .catch(error => console.log(error.response))

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
				style={{
					paddingBottom: '1rem',
				}}
			>
				Don&apos;t have an account?
			</Button>
		</>
	)
}

LogInForm.propTypes = {
	logInUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	authState: state.auth,
})

const mapDispatchToProps = dispatch => ({
	logInUser: data => dispatch(loginUserAction(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(LogInForm)
