import { getAllComments, getTotalComments } from 'graphql/queries/postQueries'
import createRequest from 'utils/createRequest'
import { useSWRInfinite } from 'swr'
import useSWRgql from 'hooks/useSWRgql'

export interface Input {
	postID: string
	postUserID: string
}

// eslint-disable-next-line
export const useGetAllComments = ({ postUserID, postID }: Input) => {
	const getKey = (index: number) => {
		const skipnum: number = (index + 1) * 10

		return [getAllComments, skipnum, postUserID, postID]
	}

	return useSWRInfinite(
		getKey,
		async (key, num, user, postID) =>
			createRequest({ key, values: { skip: num, postID, user } }),
		{ revalidateOnFocus: false }
	)
}

interface TotalComment extends Input {
	postPage: boolean
}

export const useGetTotalComment = ({
	postUserID,
	postID,
	postPage,
}: TotalComment) => {
	if (!postPage) return null

	const values = { postID, user: postUserID }

	return useSWRgql({
		key: getTotalComments,
		swrDependencies: postUserID,
		values,
	})
}
