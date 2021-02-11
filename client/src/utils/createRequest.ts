import graphQLClient from 'graphql/graphqlClient'

import { AnyObject } from 'interfaces/global'

interface input {
	operation: string
	values: AnyObject
}

const createRequest = async (
	{ operation, values }: input,
	reqToken?: string | undefined
) => {
	const data: any = await graphQLClient(reqToken).request(operation, values)
	return data
}

export default createRequest
