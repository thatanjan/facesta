import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express'
import express from 'express'

const app = express()
const typeDefs = gql`
	type Query {
		users: [User!]!
		user(username: String): User
	}
	type User {
		name: String
		username: String
	}
`
const users = [
	{ name: 'Leeroy Jenkins', username: 'leeroy' },
	{ name: 'Foo Bar', username: 'foobar' },
	{ name: 'Bar', username: 'foobar' },
]

const resolvers = {
	Query: {
		users() {
			return users
		},
		user(parent, { username }) {
			return users.find(user => user.username === username)
		},
	},
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })

export const config = {
	api: {
		bodyParser: false,
	},
}

const server = new ApolloServer({ schema })
server.applyMiddleware({ app, path: 'api/graphql' })
export default server
