import { gql } from 'apollo-server-express'

const ProfileTypedefs = gql`
	extend type Mutation {
		updatePersonalData(Input: PersonalDataInput): Response!
		uploadProfilePicture(image: String!): Response!
		removeProfilePicture: Response!
	}

	extend type Query {
		"""
		UserNameIDPic type is from graphql/Follow/FollowType file
		"""
		getPersonalData(user: ID!): PersonalData!
	}

	input PersonalDataInput {
		dateOfBirth: Date
		website: String
		status: String
		location: String
		bio: String
		name: String
	}

	type PersonalData {
		dateOfBirth: Date
		website: String
		status: String
		location: String
		bio: String
		name: String
		profilePicture: String
		errorMessage: String
	}
`

export default ProfileTypedefs
