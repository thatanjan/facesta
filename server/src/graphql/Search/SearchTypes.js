import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Query {
		searchUser(query: String): SearchUserResult
	}

	type User {
		user: ID!
		profilePicture: String!
		name: String!
	}

	type SearchUserResult {
		users: [User]
		errorMessage: String
	}
`

export default typeDefs
