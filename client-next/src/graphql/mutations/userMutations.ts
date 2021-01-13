import { gql } from 'graphql-request'
// dateOfBirth: $dateOfBirth, website:$website, status: $status, location:$location, skills: $skills,
// $dateOfBirth: Date
// ,$website: String
// ,$status: String
// ,$location: String
// ,$skills: [String!]

// eslint-disable-next-line
export const updatePersonal = gql`
	mutation updatePersonal(
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
			}
		) {
			website
		}
	}
`
