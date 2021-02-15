import {
	getFollowing,
	getFollowers,
	getIsFollower,
	getIsFollowing,
} from 'graphql/queries/followQueries'
import uswSWRgql from './useSWRgql'
import { useProfileUserId } from './profileContextHooks'

export const useFollowers = () => {
	const otherUserId = useProfileUserId()
	return uswSWRgql({
		key: getFollowers,
		swrDependencies: otherUserId,
		values: { otherUserId },
	})
}

export const useFollowing = () => {
	const otherUserId = useProfileUserId()
	return uswSWRgql({
		key: getFollowing,
		swrDependencies: otherUserId,
		values: { otherUserId },
	})
}

export const useIsFollowing = () => {
	const otherUserId = useProfileUserId()
	return uswSWRgql({
		key: getIsFollowing,
		swrDependencies: otherUserId,
		values: { otherUserId },
	})
}

export const useIsFollower = () => {
	const otherUserId = useProfileUserId()
	return uswSWRgql({
		key: getIsFollower,
		swrDependencies: otherUserId,
		values: { otherUserId },
	})
}
