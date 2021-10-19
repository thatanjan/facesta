import { getAllComments, getTotalComments } from 'graphql/queries/postQueries'
import createRequest from 'utils/createRequest'
import { useSWRInfinite, SWRInfiniteResponseInterface } from 'swr'

import useSWRgql from 'hooks/useSWRgql'
import { Comment } from 'interfaces/post'
import { getSkipNum } from './useGetPost'

export interface Input {
	postID: string
}

// eslint-disable-next-line
export const useGetAllComments = ({ postID }: Input) => {
	const getKey = (index: number) => {
		const skipnum: number = getSkipNum(index)

		return [getAllComments, skipnum, postID]
	}

	return useSWRInfinite(
		getKey,
		async (key, num) => createRequest({ key, values: { skip: num, postID } }),
		{ revalidateOnFocus: false }
	) as SWRInfiniteResponseInterface<
		{
			getAllComments: {
				comments: Comment[]
				errorMessage: string | null
			}
		},
		any
	>
}

interface TotalComment extends Input {
	postPage: boolean
}

export const useGetTotalComment = ({ postID, postPage }: TotalComment) => {
	if (!postPage) return null

	const values = { postID }

	return useSWRgql({
		key: getTotalComments,
		swrDependencies: postID,
		values,
	})
}
