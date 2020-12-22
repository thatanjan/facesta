import graphQLClient from 'graphql/graphqlClient'

const createRequest = async ({ mutation, values }: any) => {
	const data: any = await graphQLClient().request(mutation, values)
	return data
}

export default createRequest
