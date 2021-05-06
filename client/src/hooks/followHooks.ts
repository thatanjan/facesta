import {
	getFollowees,
	getFollowers,
	getIsFollower,
	getIsFollowee,
	getRecommendedToFollow,
} from 'graphql/queries/followQueries'
import { useSWRInfinite } from 'swr'

import { useAppSelector } from 'redux/hooks/hooks'

import createRequest from 'utils/createRequest'
import { AnyObject } from 'interfaces/global'
import useSWRgql from './useSWRgql'

export const useGetFollowers = () => {
	const user = useAppSelector(state => state.profile.profileUserID)

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
	const user = useAppSelector(state => state.profile.profileUserID)

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
	const user = useAppSelector(state => state.profile.profileUserID)
	return useSWRgql({
		key: getIsFollowee,
		swrDependencies: user,
		values: { user },
	})
}

export const useIsFollower = () => {
	const user = useAppSelector(state => state.profile.profileUserID)
	return useSWRgql({
		key: getIsFollower,
		swrDependencies: user,
		values: { user },
	})
}

export const useGetRecommendedToFollow = () => {
	const userID = useAppSelector(state => state.user.id)
	return useSWRgql({
		key: getRecommendedToFollow,
		swrDependencies: userID,
		values: {},
	})
}
