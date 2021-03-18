import { gql } from 'apollo-server-express'

const ProfileTypedefs = gql`
	extend type Mutation {
		updatePersonalData(Input: PersonalDataInput): ErrorOrMessage!
		uploadProfilePicture(image: String!): ErrorOrMessage!
		removeProfilePicture: ErrorOrMessage!
	}

	extend type Query {
		getPersonalData(user: String!): PersonalData!
		getProfilePicture(user: String!): ProfilePicture!
	}

	input PersonalDataInput {
		dateOfBirth: Date
		website: String
		status: String
		location: String
		skills: [String!]
		bio: String
		name: String
	}

	type ProfilePicture {
		image: String
		errorMessage: String
	}

	type PersonalData {
		dateOfBirth: Date
		website: String
		status: String
		location: String
		skills: [String!]
		bio: String
		name: String
		errorMessage: String
	}
`

export default ProfileTypedefs
