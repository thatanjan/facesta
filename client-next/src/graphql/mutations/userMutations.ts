import { gql } from 'graphql-request'
// dateOfBirth: $dateOfBirth, website:$website, status: $status, location:$location, skills: $skills,
// $dateOfBirth: Date
// ,$website: String
// ,$status: String
// ,$location: String
// ,$skills: [String!]

export const updatePersonal = gql`
	mutation updatePersonal($bio: String) {
		updatePersonal(Input: { bio: $bio }) {
			website
		}
	}
`
