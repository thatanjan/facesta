import { gql } from 'graphql-request'

// eslint-disable-next-line import/prefer-default-export
export const searchUser = gql`
	query searchUser($query: String!) {
		searchUser(query: $query) {
			users {
				user
				name
				profilePicture
			}
			errorMessage
		}
	}
`
