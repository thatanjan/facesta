import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Query {
		searchUser(text: String): SearchUserResult
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
