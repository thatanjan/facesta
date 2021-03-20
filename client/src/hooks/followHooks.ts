import {
	getFollowees,
	getFollowers,
	getIsFollower,
	getIsFollowee,
} from 'graphql/queries/followQueries'
import uswSWRgql from './useSWRgql'
import { useProfileUserID } from './profileContextHooks'

export const useGetFollowers = (start: number) => {
	const user = useProfileUserID()
	return uswSWRgql({
		key: getFollowers,
		swrDependencies: user,
		values: { user, start },
	})
}

export const useGetFollowees = (start: number) => {
	const user = useProfileUserID()
	return uswSWRgql({
		key: getFollowees,
		swrDependencies: user,
		values: { user, start },
	})
}

export const useIsFollowee = () => {
	const user = useProfileUserID()
	return uswSWRgql({
		key: getIsFollowee,
		swrDependencies: user,
		values: { user },
	})
}

export const useIsFollower = () => {
	const user = useProfileUserID()
	return uswSWRgql({
		key: getIsFollower,
		swrDependencies: user,
		values: { user },
	})
}
