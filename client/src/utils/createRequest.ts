import graphQLClient from 'graphql/graphqlClient'
import { keyInterface } from 'swr'

import { AnyObject } from 'interfaces/global'

interface Input {
	key: keyInterface
	values: AnyObject | undefined
}

const createRequest = async ({ key, values }: Input) => {
	const data: any = await graphQLClient().request(key as string, values)
	return data
}

export default createRequest
