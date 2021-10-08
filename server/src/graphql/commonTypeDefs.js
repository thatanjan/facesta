import { gql } from 'apollo-server-express'

const types = gql`
	type Error {
		errorMessage: String!
	}

	type Message {
		message: String!
	}

	type Response {
		errorMessage: String
		message: String
	}
`

export default types
