import { DependencyList } from 'react'
import useSWR, { keyInterface, ConfigInterface } from 'swr'
import useMemoizeSWROption from 'hooks/useMemoizeSWROption'

import { AnyObject } from 'interfaces/global'

import fetcher from 'utils/swrFetcher'

interface Props {
	mutation: keyInterface
	options: AnyObject
	dependencies: DependencyList
	swrOptions: ConfigInterface | undefined
}

const useSWRgql = ({ mutation, options, dependencies, swrOptions }: Props) =>
	useSWR(
		[mutation, useMemoizeSWROption(options, dependencies)],
		fetcher,
		swrOptions
	)

export default useSWRgql
