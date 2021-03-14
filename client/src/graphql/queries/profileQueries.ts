import { gql } from 'graphql-request'

const expectedOutput = 'dateOfBirth skills name bio website status location'

export const getPersonalData = (output?: string | undefined): string => gql`
	 query getPersonalData($userID: ID!) {
		 getPersonalData(userID: $userID) {
			    ${output || expectedOutput}
		 }
} `

export const getProfilePicture = gql`
	query getPersonalData($userID: ID!) {
		getProfilePicture(userID: $userID) {
			imageID
			errorMessage
		}
	}
`
