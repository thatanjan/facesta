import createRequest from 'utils/createRequest'

const fetcher = ({ mutation, options: { jwt, ...data } }: any) => async () =>
	createRequest({ mutation, values: data }, jwt)

export default fetcher
