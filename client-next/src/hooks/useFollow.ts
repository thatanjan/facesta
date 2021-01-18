import {
	getFollowing,
	getFollowers,
	getIsFollower,
	getIsFollowing,
} from 'graphql/queries/followQueries'
import uswSWRgql from './useSWRgql'

export const useFollowers = (userId: string) =>
	uswSWRgql({
		mutation: getFollowers,
		swrDependencies: userId,
		options: { userId },
	})

export const useFollowing = (userId: string) =>
	uswSWRgql({
		mutation: getFollowing,
		swrDependencies: userId,
		options: { userId },
	})

export const useIsFollowing = (userId: string) =>
	uswSWRgql({
		mutation: getIsFollowing,
		swrDependencies: userId,
		options: { userId },
	})

export const useIsFollower = (userId: string) =>
	uswSWRgql({
		mutation: getIsFollower,
		swrDependencies: userId,
		options: { userId },
	})
