import React, { useState, useContext } from 'react'
import { gql } from 'graphql-request'
import { Formik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'
import dynamic from 'next/dynamic'
import login from 'utils/login'

import { error, LoginData } from 'interfaces/authentication'
import graphQLClient from 'graphql/graphqlClient'
import { UserContext } from 'context/userContext'

const Alert = dynamic(() => import('@material-ui/lab/Alert'))

const loginMutation = gql`
	mutation logInUser($email: String!, $password: String!) {
		loginUser(loginInput: { email: $email, password: $password }) {
			success
			token
			message
		}
	}
`

const setToken = (token: string) => localStorage.setItem('jwt', token)

const LogInForm = () => {
	const [, setUser]: any = useContext(UserContext)

	const [errorMessage, setErrorMessage] = useState('')

	const loginUser = async (values: any) => {
		try {
			const {
				loginUser: { message, token },
			}: LoginData = await graphQLClient().request(loginMutation, values)

			if (message) {
				setErrorMessage(message)

				setTimeout(() => {
					setErrorMessage('')
				}, 3000)

				return false
			}

			setToken(token)
			login({ setUser })

			return true
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
