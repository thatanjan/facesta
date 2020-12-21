import { GraphQLClient } from 'graphql-request'
const endpoint = 'http://localhost:8000/graphql'

const token = () => {
	const jwtToken = localStorage.getItem('jwt')

	return jwtToken || ''
}

const graphQlClient = () =>
	new GraphQLClient(endpoint, {
		headers: {
			authorization: token(),
		},
	})

export default graphQlClient
