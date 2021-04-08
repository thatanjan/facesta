import { gql } from 'graphql-request'

export const getPersonalData = gql`
	query getPersonalData($user: ID!) {
		getPersonalData(user: $user) {
			dateOfBirth
			skills
			name
			bio
			website
			status
			location
			profilePicture
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
