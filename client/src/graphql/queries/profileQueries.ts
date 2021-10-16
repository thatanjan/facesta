import { gql } from 'graphql-request'

export const getPersonalData = gql`
	query getPersonalData($user: ID!) {
		getPersonalData(user: $user) {
			dateOfBirth
			name
			bio
			website
			status
			location
			profilePicture
			errorMessage
		}
	}
`

export const getProfilePicture = gql`
	query getPersonalData($user: ID!) {
		getProfilePicture(user: $user) {
			image
			errorMessage
		}
	}
`

export const getUser = gql`
	query getUser($userID: ID!) {
		getUser(userID: $userID) {
			_id
			profile {
				name
				profilePicture
			}
		}
	}
`
