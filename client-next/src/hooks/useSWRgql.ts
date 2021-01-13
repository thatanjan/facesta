import useSWR, { keyInterface, ConfigInterface } from 'swr'

import { AnyObject } from 'interfaces/global'

import fetcher from 'utils/swrFetcher'

interface Props {
	mutation: keyInterface
	options?: AnyObject | undefined
	swrOptions?: ConfigInterface | undefined
	swrDependencies?: string | number
}

const useSWRgql = ({ mutation, options, swrOptions, swrDependencies }: Props) =>
	useSWR(mutation, fetcher({ mutation, options }), swrOptions)

export default useSWRgql
