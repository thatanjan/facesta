import { useSWRInfinite } from 'swr'

import createRequest from 'utils/createRequest'
import { hasLiked, getAllLikes } from 'graphql/queries/postQueries'
import useSWRgql from './useSWRgql'
import { getSkipNum } from './useGetPost'

interface Input {
	postID: string
}

export const useHasLiked = ({ postID }: Input) => {
	return useSWRgql({
		key: hasLiked,
		swrDependencies: postID,
		values: { postID },
	})
}

export const useGetAllLikes = ({ postID }: Input) => {
	const getKey = (index: number) => {
		const skipnum: number = getSkipNum(index)

		return [getAllLikes, skipnum, postID]
	}

	return useSWRInfinite(
		getKey,
		// eslint-disable-next-line
		async (key, num, postID) =>
			createRequest({ key, values: { skip: num, postID } }),
		{ revalidateOnFocus: false }
	)
}
