import {
	getFollowees,
	getFollowers,
	getIsFollower,
	getIsFollowee,
} from 'graphql/queries/followQueries'
import uswSWRgql from './useSWRgql'
import { useProfileUserID } from './profileContextHooks'

export const useFollowers = () => {
	const userID = useProfileUserID()
	return uswSWRgql({
		key: getFollowers,
		swrDependencies: userID,
		values: { userID },
	})
}

export const useFollowees = () => {
	const userID = useProfileUserID()
	return uswSWRgql({
		key: getFollowees,
		swrDependencies: userID,
		values: { userID },
	})
}

export const useIsFollowee = () => {
	const userID = useProfileUserID()
	return uswSWRgql({
		key: getIsFollowee,
		swrDependencies: userID,
		values: { userID },
	})
}

export const useIsFollower = () => {
	const userID = useProfileUserID()
	return uswSWRgql({
		key: getIsFollower,
		swrDependencies: userID,
		values: { userID },
	})
}
