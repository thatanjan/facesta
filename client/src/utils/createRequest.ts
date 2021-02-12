import graphQLClient from 'graphql/graphqlClient'
import { keyInterface } from 'swr'

import { AnyObject } from 'interfaces/global'

interface Input {
	operation: keyInterface
	values: AnyObject | undefined
}

const createRequest = async ({ operation, values }: Input) => {
	const data: any = await graphQLClient().request(operation as string, values)
	return data
}

export default createRequest
