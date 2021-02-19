import { gql } from 'apollo-server-express'
import { PROFILE_OWNER_ID_TYPE } from 'variables/commonText'

const ProfileMutationTypeDefs = gql`
	extend type Mutation {
		updatePersonal(Input: PersonalDataInput): ErrorOrMessage!
	}
`

const InputTypedefs = gql`
	input PersonalDataInput{
		${PROFILE_OWNER_ID_TYPE}!
	}

	input PersonalInput {
		dateOfBirth: Date
		website: String
		status: String
		location: String
		skills: [String!]
		bio: String
	}

     input ProfileIDInput {
          ${PROFILE_OWNER_ID_TYPE}!
     }
`

const ProfileTypedefs = gql`
	extend type Query {
		getPersonal(Input: ProfileIDInput): PersonalData!
	}

	union returnPersonalData = PersonalData | Error

	${ProfileMutationTypeDefs}
	${InputTypedefs}

	type PersonalData {
		dateOfBirth: Date
		website: String
		status: String
		location: String
		skills: [String!]
		bio: String
		name: String
	}
`

export default ProfileTypedefs
