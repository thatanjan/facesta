import { gql } from 'apollo-server-express'

const FollowType = gql`
	extend type Query {
		getFollowers(Input: GetAllInput!): Followers!
		getFollowees(Input: GetAllInput!): Followees!
		getIsFollowee(user: ID!): IsFollowee!
		getIsFollower(user: ID!): IsFollower!
		getRecommendedToFollow: RecommendedUsers!
	}

	extend type Mutation {
		followUser(user: ID!): Response!
		unfollowUser(user: ID!): Response!
	}

	type Profile {
		profilePicture: String!
		name: String!
	}

	type UserNameIDPic {
		_id: ID!
		profile: Profile!
		errorMessage: String
	}

	type Followers {
		followers: [UserNameIDPic]
		errorMessage: String
	}

	type Followees {
		followees: [UserNameIDPic]
		errorMessage: String
	}

	type RecommendedUsers {
		users: [UserNameIDPic]
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
		skip: Int!
	}
`

export default FollowType
