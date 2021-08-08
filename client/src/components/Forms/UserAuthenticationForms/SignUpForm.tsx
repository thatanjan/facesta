import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'

import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { Error, RegisterInput, RegisterOutput } from 'interfaces/authentication'

import login from 'utils/login'
import MuiLink from 'components/Links/MuiLink'
import createRequest from 'utils/createRequest'

import { registerMutation } from 'graphql/mutations/authMutations'

const Alert = dynamic(() => import('@material-ui/lab/Alert'))

const SignUpForm = () => {
	const [disableInput, setDisableInput] = useState(false)
	const router = useRouter()

	const [AlertMessage, setAlertMessage] = useState('')

	const registerUser = async (values: RegisterInput) => {
		try {
			const {
				registerUser: { token, errorMessage },
			}: RegisterOutput = await createRequest({
				key: registerMutation,
				values,
			})

			if (errorMessage) {
				setAlertMessage(errorMessage)

				setTimeout(() => {
					setAlertMessage('')
				}, 3000)

				return false
			}

			const loginSuccessful = await login(token)

			if (loginSuccessful) {
				router.push('/')
				return true
			}
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

					if (password.length > 30) {
						errors.password = 'password must be under 30 characters long'
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
					setDisableInput(true)

					registerUser(values)
						.then(res => {
							if (!res) setDisableInput(false)
							setSubmitting(false)
						})
						.catch(() => setDisableInput(false))
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<Field
							component={TextField}
							name='name'
							type='text'
							label='User Name'
							disabled={disableInput}
						/>
						<Field
							component={TextField}
							name='email'
							type='email'
							label='Email'
							disabled={disableInput}
						/>
						<br />
						<Field
							component={TextField}
							type='password'
							label='Password'
							name='password'
							disabled={disableInput}
						/>
						<Field
							component={TextField}
							type='password'
							label='Confirm Password'
							name='confirmPassword'
							disabled={disableInput}
						/>

						{isSubmitting && <LinearProgress />}
						<br />
						<Button
							variant='contained'
							color='primary'
							disabled={isSubmitting || disableInput}
							onClick={submitForm}
						>
							Register
						</Button>

						<br />
					</Form>
				)}
			</Formik>

			<MuiLink
				MuiComponent={Button}
				color='primary'
				size='small'
				href='/authentication/login'
			>
				have an account?
			</MuiLink>

			{AlertMessage && (
				<Alert variant='filled' severity='error'>
					{AlertMessage}
				</Alert>
			)}
		</>
	)
}

export default SignUpForm
