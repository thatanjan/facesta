import { gql } from 'graphql-request'
import { ERROR_OR_MESSAGE } from 'variables/global'

// eslint-disable-next-line
export const updatePersonalData = gql`
	mutation updatePersonalData(
		$dateOfBirth: Date
		$bio: String
		$website: String
		$status: String
		$location: String
		$name: String
		$skills: [String!]
	) {
		updatePersonalData(
			Input: {
				name: $name
				bio: $bio
				skills: $skills
				website: $website
				status: $status
				location: $location
				dateOfBirth: $dateOfBirth
			}
		) {
			${ERROR_OR_MESSAGE}
		}
	}
`

export const uploadProfilePicture = gql`
	mutation uploadProfilePicture($image: String!){
		uploadProfilePicture(image: $image){
			${ERROR_OR_MESSAGE}
		}
	}
`
