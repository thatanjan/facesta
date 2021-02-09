import graphqlClient from 'graphql/graphqlClient'

import { AnyObject } from 'interfaces/global'

const graphqlFetch = async (key: string, { token, ...params }: AnyObject) => {
	return graphqlClient(token).request(key, params)
}

export default graphqlFetch
