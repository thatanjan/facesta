import { gql } from 'graphql-request'

// eslint-disable-next-line
export const updatePersonal = gql`
	mutation updatePersonal(
		$dateOfBirth: Date
		$bio: String
		$website: String
		$status: String
		$location: String
		$skills: [String!]
	) {
		updatePersonal(
			Input: {
				bio: $bio
				skills: $skills
				website: $website
				status: $status
				location: $location
				dateOfBirth: $dateOfBirth
			}
		) {
			website
		}
	}
`
