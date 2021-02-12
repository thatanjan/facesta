import createRequest from 'utils/createRequest'
import { keyInterface } from 'swr'
import { AnyObject } from 'interfaces/global'

export interface Parameters {
	key: keyInterface
	values: AnyObject | undefined
}

const fetcher = ({ key, values }: Parameters) => async () =>
	createRequest({ key, values })

export default fetcher
