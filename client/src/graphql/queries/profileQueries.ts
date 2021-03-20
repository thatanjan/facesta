import { gql } from 'graphql-request'

const expectedOutput = 'dateOfBirth skills name bio website status location'

export const getPersonalData = (output?: string | undefined): string => gql`
	 query getPersonalData($user: ID!) {
		 getPersonalData(user: $user) {
			    ${output || expectedOutput}
		 }
} `

export const getProfilePicture = gql`
	query getPersonalData($user: ID!) {
		getProfilePicture(user: $user) {
			image
			errorMessage
		}
	}
`
