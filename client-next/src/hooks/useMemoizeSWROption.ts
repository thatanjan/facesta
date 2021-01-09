import { useMemo, DependencyList } from 'react'
import { AnyObject } from 'interfaces/global'

const useMemoizeSWROption = (
	options: AnyObject,
	dependencies: DependencyList
) => useMemo(() => options, dependencies)

export default useMemoizeSWROption
