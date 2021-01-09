import { DependencyList } from 'react'
import useSWR, { keyInterface } from 'swr'
import useMemoizeSWROption from 'hooks/useMemoizeSWROption'

import { AnyObject } from 'interfaces/global'

import fetcher from 'utils/swrFetcher'

interface Props {
	mutation: keyInterface
	options: AnyObject
	dependencies: DependencyList
}

const useSWRgql = ({ mutation, options, dependencies }: Props) =>
	useSWR([mutation, useMemoizeSWROption(options, dependencies)], fetcher)

export default useSWRgql
