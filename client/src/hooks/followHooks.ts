import {
	getFollowees,
	getFollowers,
	getIsFollower,
	getIsFollowee,
} from 'graphql/queries/followQueries'
import { useSWRInfinite } from 'swr'

import createRequest from 'utils/createRequest'
import { AnyObject } from 'interfaces/global'
import uswSWRgql from './useSWRgql'
import { useProfileUserID } from './profileContextHooks'

export const useGetFollowers = () => {
	const user = useProfileUserID()

	const getKey = (index: number, previousPageData: AnyObject) => {
		if (previousPageData && previousPageData.getFollowers.followers.length === 0)
			return null
		const skipnum: number = (index + 1) * 10

		return [getFollowers, skipnum, user]
	}

	return useSWRInfinite(
		getKey,
		async (key, num) => createRequest({ key, values: { skip: num, user } }),
		{ revalidateOnFocus: false }
	)
}

export const useGetFollowees = () => {
	const user = useProfileUserID()

	const getKey = (index: number, previousPageData: AnyObject) => {
		if (previousPageData && previousPageData.getFollowees?.followees.length === 0)
			return null
		const skipnum: number = (index + 1) * 10

		return [getFollowees, skipnum, user]
	}

	return useSWRInfinite(
		getKey,
		async (key, num) => createRequest({ key, values: { skip: num, user } }),
		{ revalidateOnFocus: false }
	)
}

export const useIsFollowee = () => {
	const user = useProfileUserID()
	return uswSWRgql({
		key: getIsFollowee,
		swrDependencies: user,
		values: { user },
	})
}

export const useIsFollower = () => {
	const user = useProfileUserID()
	return uswSWRgql({
		key: getIsFollower,
		swrDependencies: user,
		values: { user },
	})
}
