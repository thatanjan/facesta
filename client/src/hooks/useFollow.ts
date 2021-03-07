import {
	getFollowees,
	getFollowers,
	getIsFollower,
	getIsFollowee,
} from 'graphql/queries/followQueries'
import uswSWRgql from './useSWRgql'
import { useProfileUserId } from './profileContextHooks'

export const useFollowers = () => {
	const userID = useProfileUserId()
	return uswSWRgql({
		key: getFollowers,
		swrDependencies: userID,
		values: { userID },
	})
}

export const useFollowees = () => {
	const userID = useProfileUserId()
	return uswSWRgql({
		key: getFollowees,
		swrDependencies: userID,
		values: { userID },
	})
}

export const useIsFollowee = () => {
	const userID = useProfileUserId()
	return uswSWRgql({
		key: getIsFollowee,
		swrDependencies: userID,
		values: { userID },
	})
}

export const useIsFollower = () => {
	const userID = useProfileUserId()
	return uswSWRgql({
		key: getIsFollower,
		swrDependencies: userID,
		values: { userID },
	})
}
