import graphQLClient from 'graphql/graphqlClient'

import { Error as inputValues } from 'interfaces/authentication'

interface input {
	mutation: string
	values: inputValues
}

const createRequest = async ({ mutation, values }: input) => {
	const data: any = await graphQLClient().request(mutation, values)
	return data
}

export default createRequest
