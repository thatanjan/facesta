import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Error, LoginInput, LoginOutput } from 'interfaces/authentication'

import { loginMutation } from 'graphql/mutations/authMutations'

import login from 'utils/login'
import createRequest from 'utils/createRequest'
import MuiLink from 'components/Links/MuiLink'

const Alert = dynamic(() => import('@material-ui/lab/Alert'))

const LogInForm = () => {
	const [disableInput, setDisableInput] = useState(false)
	const { push } = useRouter()

	const [AlertMessage, setAlertMessage] = useState('')

	const loginUser = async (values: LoginInput) => {
		try {
			const {
				loginUser: { errorMessage, token },
			}: LoginOutput = await createRequest({
				key: loginMutation,
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
				push('/')
				return true
			}
		} catch (err: any) {
			return err
		}

		return true
	}

	return (
		<>
			<Formik
				initialValues={{
					email: 'dummy@gmail.com',
					password: '123456',
				}}
				validate={values => {
					const { password } = values

					const errors: Error = {}
					if (!values.email) {
						errors.email = 'Required'
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
					) {
						errors.email = 'Invalid email address'
					}

					if (!password) {
						errors.password = 'Required'
					} else if (password.length < 6 || password.length > 30) {
						errors.password = 'Password should be under 6 to 30 characters long'
					}

					return errors
				}}
				onSubmit={async (values, { setSubmitting }) => {
					setDisableInput(true)
					const loginStatus = await loginUser(values)

					if (!loginStatus) setDisableInput(false)

					if (!loginStatus || loginStatus) {
						setSubmitting(false)
					}
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<Field
							component={TextField}
							name='email'
							type='email'
							label='Email'
							disabled={disableInput}
						/>
						<br />
						<Field
							disabled={disableInput}
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
							disabled={isSubmitting || disableInput}
							onClick={submitForm}
						>
							Log In
						</Button>

						<br />
					</Form>
				)}
			</Formik>
			<MuiLink
				MuiComponent={Button}
				size='small'
				href='/authentication/sign-up'
				disabled={disableInput}
			>
				Don&apos;t have an account?
			</MuiLink>

			{AlertMessage && (
				<Alert variant='filled' severity='error'>
					{AlertMessage}
				</Alert>
			)}
		</>
	)
}

export default LogInForm
