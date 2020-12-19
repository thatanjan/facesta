import React from 'react'
// import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { TextField } from 'formik-material-ui'

import { error } from 'interfaces/authentication'
// import { loginUserAction } from 'redux/actions/authActions'

export const useStyles = makeStyles((theme: Theme) => ({
	submitButtonStyle: {
		color: `${theme.palette.primary.light}`,
	},
}))

const LogInForm = () => {
	const { submitButtonStyle } = useStyles()

	return (
		<>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validate={values => {
					const errors: error = {}
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
					// logInUser(values)
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
				className={submitButtonStyle}
				size='small'
				href='/authentication/sign-up'
				style={{
					paddingBottom: '1rem',
				}}
				component='button'
			>
				Don&apos;t have an account?
			</Button>
		</>
	)
}

// LogInForm.propTypes = {
// 	logInUser: PropTypes.func.isRequired,
// }

// const mapStateToProps = state => ({
// 	authState: state.auth,
// })

// const mapDispatchToProps = dispatch => ({
// 	logInUser: data => dispatch(loginUserAction(data)),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(LogInForm)
export default LogInForm
