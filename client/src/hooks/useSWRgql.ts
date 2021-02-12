import useSWR, { keyInterface, ConfigInterface } from 'swr'

import fetcher, { Parameters as FetcherParameters } from 'utils/swrFetcher'

interface Props {
	key: keyInterface
	values?: FetcherParameters
	swrOptions?: ConfigInterface | undefined
	swrDependencies?: string | number
}

const useSWRgql = ({ key, swrOptions, swrDependencies, values }: Props) =>
	useSWR([key, swrDependencies], fetcher({ key, values }), swrOptions)

export default useSWRgql
