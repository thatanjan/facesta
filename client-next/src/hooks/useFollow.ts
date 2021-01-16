import { getFollowing, getFollowers } from 'graphql/queries/followQueries'
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
