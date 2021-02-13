import {
	getFollowing,
	getFollowers,
	getIsFollower,
	getIsFollowing,
} from 'graphql/queries/followQueries'
import uswSWRgql from './useSWRgql'

export const useFollowers = (otherUserId: string) =>
	uswSWRgql({
		key: getFollowers,
		swrDependencies: otherUserId,
		values: { otherUserId },
	})

export const useFollowing = (otherUserId: string) =>
	uswSWRgql({
		key: getFollowing,
		swrDependencies: otherUserId,
		values: { otherUserId },
	})

export const useIsFollowing = (otherUserId: string) =>
	uswSWRgql({
		key: getIsFollowing,
		swrDependencies: otherUserId,
		values: { otherUserId },
	})

export const useIsFollower = (otherUserId: string) =>
	uswSWRgql({
		key: getIsFollower,
		swrDependencies: otherUserId,
		values: { otherUserId },
	})
