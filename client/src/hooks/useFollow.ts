import {
	getFollowing,
	getFollowers,
	getIsFollower,
	getIsFollowing,
} from 'graphql/queries/followQueries'
import uswSWRgql from './useSWRgql'

export const useFollowers = (ownUserId: string) =>
	uswSWRgql({
		operation: getFollowers,
		swrDependencies: ownUserId,
		values: { ownUserId },
	})

export const useFollowing = (ownUserId: string) =>
	uswSWRgql({
		operation: getFollowing,
		swrDependencies: ownUserId,
		values: { ownUserId },
	})

export const useIsFollowing = (otherUserId: string) =>
	uswSWRgql({
		operation: getIsFollowing,
		swrDependencies: otherUserId,
		values: { otherUserId },
	})

export const useIsFollower = (otherUserId: string) =>
	uswSWRgql({
		operation: getIsFollower,
		swrDependencies: otherUserId,
		values: { otherUserId },
	})
