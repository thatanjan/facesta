import useSWR, { ConfigInterface } from 'swr'

import fetcher, { Parameters as FetcherParameters } from 'utils/swrFetcher'

interface Props extends FetcherParameters {
	conditionState?: boolean | undefined
	swrOptions?: ConfigInterface | undefined
	swrDependencies?: string | number
}

const useSWRgql = ({
	conditionState,
	key,
	swrOptions,
	swrDependencies,
	values,
}: Props) =>
	useSWR(
		[conditionState !== false ? key : null, swrDependencies],
		fetcher({ key, values }),
		swrOptions
	)

export default useSWRgql
