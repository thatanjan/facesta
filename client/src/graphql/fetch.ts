import graphqlClient from 'graphql/graphqlClient'

import { AnyObject } from 'interfaces/global'

const graphqlFetch = async (key: string, params: AnyObject) => {
	return graphqlClient().request(key, params)
}

export default graphqlFetch
