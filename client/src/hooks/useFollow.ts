import {
	getFollowing,
	getFollowers,
	getIsFollower,
	getIsFollowing,
} from 'graphql/queries/followQueries'
import uswSWRgql from './useSWRgql'

export const useFollowers = (ownUserId: string) =>
	uswSWRgql({
		key: getFollowers,
		swrDependencies: ownUserId,
		values: { ownUserId },
	})

export const useFollowing = (ownUserId: string) =>
	uswSWRgql({
		key: getFollowing,
		swrDependencies: ownUserId,
		values: { ownUserId },
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
