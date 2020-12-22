import { gql } from 'graphql-request'

export const loginMutation = gql`
	mutation logInUser($email: String!, $password: String!) {
		loginUser(loginInput: { email: $email, password: $password }) {
			success
			token
			message
		}
	}
`

export const registerMutation = gql`
	mutation registerUser(
		$name: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		registerUser(
			registerInput: {
				name: $name
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			success
			token
			message
		}
	}
`
