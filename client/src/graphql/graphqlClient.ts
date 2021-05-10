import Cookies from 'js-cookie'
import { GraphQLClient } from 'graphql-request'

import { TOKEN_NAME } from 'variables/global'

const token = (): string => {
	let jwtToken: string | undefined = ''

	if (typeof window !== 'undefined') {
		jwtToken = Cookies.get(TOKEN_NAME)
	}

	return jwtToken || ''
}

const graphQlClient = () =>
	new GraphQLClient(process.env.NEXT_PUBLIC_SERVER_URL as string, {
		headers: {
			authorization: token(),
		},
	})

export default graphQlClient
