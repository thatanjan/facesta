import { gql } from 'apollo-server-express'
import {
	USER_ID_TYPE,
	PROFILE_OWNER_ID_TYPE,
	ERROR_MESSAGE_TYPE,
} from 'variables/commonText'

const ProfileMutationTypeDefs = gql`
	extend type Mutation {
		updatePersonalData(Input: PersonalDataInput): ErrorOrMessage!
	}
`

const InputTypedefs = gql`

	input PersonalDataInput {
		dateOfBirth: Date
		website: String
		status: String
		location: String
		skills: [String!]
		bio: String
		name: String
	}

     input ProfileIDInput {
          ${PROFILE_OWNER_ID_TYPE}!
     }
`

const ProfileTypedefs = gql`
	extend type Query {
		getPersonalData(${USER_ID_TYPE}): PersonalData!
	}

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
		${ERROR_MESSAGE_TYPE}
	}
`

export default ProfileTypedefs
