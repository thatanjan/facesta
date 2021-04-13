import Cookies from 'js-cookie'
import { GraphQLClient } from 'graphql-request'

import { TOKEN_NAME, END_POINT } from 'variables/global'

const token = (): string => {
	let jwtToken: string | undefined = ''

	if (typeof window !== 'undefined') {
		jwtToken = Cookies.get(TOKEN_NAME)
	}

	return jwtToken || ''
}

const graphQlClient = () =>
	new GraphQLClient(END_POINT as string, {
		headers: {
			authorization: token(),
		},
	})

export default graphQlClient
