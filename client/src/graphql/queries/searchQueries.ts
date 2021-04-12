import { gql } from 'graphql-request'

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
