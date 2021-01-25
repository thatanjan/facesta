import Cookies from 'js-cookie'
import { GraphQLClient } from 'graphql-request'

import { TOKEN_NAME } from 'variables/global'

const endpoint = 'http://localhost:8000/graphql'

const token = (): string => {
	let jwtToken: string | undefined = ''

	if (typeof window !== 'undefined') {
		jwtToken = Cookies.get(TOKEN_NAME)
	}

	return jwtToken || ''
}

const graphQlClient = (reqToken?: string | undefined) =>
	new GraphQLClient(endpoint, {
		headers: {
			authorization: reqToken || token(),
		},
	})

export default graphQlClient
