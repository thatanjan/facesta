import React, { useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'

import { useRouter } from 'next/router'
import { UserContext } from 'context/userContext'

import { Error, RegisterInput, RegisterOutput } from 'interfaces/authentication'

import login from 'utils/login'
import createRequest from 'utils/createRequest'

import { registerMutation } from 'mutations/authMutations'

const SignUpForm = () => {
	const registerUser = async (values: RegisterInput) => {
		try {
			const {
				registerUser: { token, message },
			}: RegisterOutput = await createRequest({
				mutation: registerMutation,
				values,
			})

			console.log(token)
		} catch (error) {
			return false
		}

		return true
	}
	return (
		<>
			<Formik
				initialValues={{
					name: '',
					email: '',
					password: '',
					confirmPassword: '',
				}}
				validate={({ email, password, confirmPassword, name }) => {
					const errors: Error = {}

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
					registerUser(values)
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
				component='button'
				href='/authentication/login'
				style={{
					paddingBottom: '1rem',
				}}
			>
				have an account?
			</Button>
		</>
	)
}

export default SignUpForm
