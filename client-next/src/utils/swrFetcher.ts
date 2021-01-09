import createRequest from 'utils/createRequest'

const fetcher = async (mutation: string, { jwt, ...data }: any) =>
	createRequest({ mutation, values: data }, jwt)

export default fetcher
