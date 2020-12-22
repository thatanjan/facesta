import React, { useState, useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Error, LoginInput, LoginOutput } from 'interfaces/authentication'
import { UserContext } from 'context/userContext'

import { loginMutation } from 'mutations/authMutations'

import login from 'utils/login'
import createRequest from 'utils/createRequest'

const Alert = dynamic(() => import('@material-ui/lab/Alert'))

const setToken = (token: string) => localStorage.setItem('jwt', token)

const LogInForm = () => {
	const router = useRouter()
	const [, setUser]: any = useContext(UserContext)

	const [errorMessage, setErrorMessage] = useState('')

	const loginUser = async (values: LoginInput) => {
		try {
			const {
				loginUser: { message, token },
			}: LoginOutput = await createRequest({
				mutation: loginMutation,
				values,
			})

			if (message) {
				setErrorMessage(message)

				setTimeout(() => {
					setErrorMessage('')
				}, 3000)

				return false
			}

			setToken(token)
			const loginSuccessful = await login({ setUser })

			if (loginSuccessful) {
				router.push('/')
				return true
			}
		} catch (err: any) {
			console.log(err)
		}

		return true
	}

	return (
		<>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validate={values => {
					const errors: Error = {}
					if (!values.email) {
						errors.email = 'Required'
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
					) {
						errors.email = 'Invalid email address'
					}
					return errors
				}}
				onSubmit={async (values, { setSubmitting }) => {
					loginUser(values)

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
				size='small'
				href='/authentication/sign-up'
				style={{
					paddingBottom: '1rem',
				}}
				component='button'
			>
				Don&apos;t have an account?
			</Button>

			{errorMessage && (
				<Alert variant='filled' severity='error'>
					{errorMessage}
				</Alert>
			)}
		</>
	)
}

export default LogInForm
