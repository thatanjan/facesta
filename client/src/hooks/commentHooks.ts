import { getAllComments } from 'graphql/queries/postQueries'
import createRequest from 'utils/createRequest'
import { useSWRInfinite } from 'swr'
import { useOwnUserId } from 'hooks/userhooks'

export interface Input {
	postID: string
	postUserID: string
}

// eslint-disable-next-line
export const useGetAllComments = ({ postUserID, postID }: Input) => {
	const userID = useOwnUserId()

	const getKey = (index: number) => {
		const skipnum: number = (index + 1) * 10

		return [getAllComments, skipnum, userID]
	}

	return useSWRInfinite(
		getKey,
		async (key, num) =>
			createRequest({ key, values: { skip: num, postID, user: postUserID } }),
		{ revalidateOnFocus: false }
	)
}
