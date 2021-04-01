import { useSWRInfinite } from 'swr'

import createRequest from 'utils/createRequest'
import { hasLiked, getAllLikes } from 'graphql/queries/postQueries'
import useSWRgql from './useSWRgql'

interface Input {
	postID: string
	user: string
}

export const useHasLiked = ({ postID, user }: Input) => {
	return useSWRgql({
		key: hasLiked,
		swrDependencies: postID,
		values: { postID, user },
	})
}

export const useGetAllLikes = ({ user, postID }: Input) => {
	const getKey = (index: number) => {
		const skipnum: number = (index + 1) * 10

		return [getAllLikes, skipnum, user, postID]
	}

	return useSWRInfinite(
		getKey,
		// eslint-disable-next-line
		async (key, num, user, postID) =>
			createRequest({ key, values: { skip: num, postID, user } }),
		{ revalidateOnFocus: false }
	)
}
