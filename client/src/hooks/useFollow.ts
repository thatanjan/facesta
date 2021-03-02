import {
	getFollowee,
	getFollowers,
	getIsFollower,
	getIsFollowee,
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

export const useFollowee = () => {
	const otherUserId = useProfileUserId()
	return uswSWRgql({
		key: getFollowee,
		swrDependencies: otherUserId,
		values: { otherUserId },
	})
}

export const useIsFollowee = () => {
	const otherUserId = useProfileUserId()
	return uswSWRgql({
		key: getIsFollowee,
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
