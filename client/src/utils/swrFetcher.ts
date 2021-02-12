import createRequest from 'utils/createRequest'
import { keyInterface } from 'swr'
import { AnyObject } from 'interfaces/global'

export interface Parameters {
	operation: keyInterface
	values: AnyObject | undefined
}

const fetcher = ({ operation, values }: Parameters) => async () =>
	createRequest({ operation, values })

export default fetcher
