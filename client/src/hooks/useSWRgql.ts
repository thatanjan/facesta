import useSWR, { keyInterface, ConfigInterface } from 'swr'

import { AnyObject } from 'interfaces/global'

import fetcher from 'utils/swrFetcher'

interface Props {
	operation: keyInterface
	values?: AnyObject | undefined
	swrOptions?: ConfigInterface | undefined
	swrDependencies?: string | number
}

const useSWRgql = ({ operation, swrOptions, swrDependencies, values }: Props) =>
	useSWR(
		[operation, swrDependencies],
		fetcher({ operation, values }),
		swrOptions
	)

export default useSWRgql
