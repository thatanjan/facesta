import createRequest from 'utils/createRequest'

const fetcher = ({ operation, options: { jwt, ...data } }: any) => async () =>
	createRequest({ operation, values: data }, jwt)

export default fetcher
