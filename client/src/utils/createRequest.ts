import graphQLClient from 'graphql/graphqlClient'

import { AnyObject } from 'interfaces/global'

interface input {
	mutation: string
	values: AnyObject
}

const createRequest = async (
	{ mutation, values }: input,
	reqToken?: string | undefined
) => {
	const data: any = await graphQLClient(reqToken).request(mutation, values)
	return data
}

export default createRequest
