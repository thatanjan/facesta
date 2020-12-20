import React from 'react'
import { gql } from 'graphql-request'
import { Formik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'

import { error, LoginData } from 'interfaces/authentication'
import graphQLClient from 'graphql/graphqlClient'

const loginMutation = gql`
	mutation logInUser($email: String!, $password: String!) {
		loginUser(loginInput: { email: $email, password: $password }) {
			success
			token
		}
	}
`

const LogInForm = () => {
	const logInUser = async (values: any) => {
		try {
			const data: LoginData = await graphQLClient.request(loginMutation, values)

			console.log(data)
		} catch (err: any) {
			console.log(err)
		}
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

export default LogInForm
