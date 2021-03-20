import { gql } from 'apollo-server-express'

const FollowType = gql`
	extend type Query {
		getFollowers(Input: GetAllInput!): Followers!
		getFollowees(Input: GetAllInput!): Followees!
		getIsFollowee(user: ID!): IsFollowee!
		getIsFollower(user: ID!): IsFollower!
	}

	extend type Mutation {
		followUser(user: ID!): ErrorOrMessage!
		unfollowUser(user: ID!): ErrorOrMessage!
	}

	type Profile {
		profilePicture: String
	}
	type UserList {
		name: String!
		_id: ID!
		profile: Profile
	}

	type Followers {
		followers: [UserList!]
		errorMessage: String
	}

	type Followees {
		followees: [UserList!]
		errorMessage: String
	}

	type IsFollowee {
		isFollowee: Boolean
		errorMessage: String
	}

	type IsFollower {
		isFollower: Boolean
		errorMessage: String
	}

	input GetAllInput {
		user: ID!
		start: Int!
	}
`

export default FollowType
