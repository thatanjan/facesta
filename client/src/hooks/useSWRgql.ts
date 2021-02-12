import useSWR, { keyInterface, ConfigInterface } from 'swr'

import fetcher, { Parameters as FetcherParameters } from 'utils/swrFetcher'

interface Props {
	operation: keyInterface
	values?: FetcherParameters
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
