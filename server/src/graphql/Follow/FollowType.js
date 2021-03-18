import { gql } from 'apollo-server-express'

const FollowType = gql`
	extend type Query {
		getFollowers(user: ID!): Followers!
		getFollowees(user: ID!): Followees!
		getIsFollowee(user: ID!): IsFollowee!
		getIsFollower(user: ID!): IsFollower!
	}

	extend type Mutation {
		followUser(user: ID!): ErrorOrMessage!
		unfollowUser(user: ID!): ErrorOrMessage!
	}

	type UserList {
		name: String!
		_id: ID!
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
`

export default FollowType
