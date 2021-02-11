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

export const useIsFollowing = (ownUserId: string) =>
	uswSWRgql({
		operation: getIsFollowing,
		swrDependencies: ownUserId,
		values: { ownUserId },
	})

export const useIsFollower = (ownUserId: string) =>
	uswSWRgql({
		operation: getIsFollower,
		swrDependencies: ownUserId,
		values: { ownUserId },
	})
