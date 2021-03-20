import {
	getAllPost,
	getSinglePost,
	getNewsFeedPost,
} from 'graphql/queries/postQueries'
import useSWRgql from 'hooks/useSWRgql'
import { useOwnUserId } from 'hooks/userhooks'
import { useProfileUserID } from 'hooks/profileContextHooks'

const useGetAllPost = (start: number) => {
	const mutation = getAllPost
	const user = useProfileUserID()
	const values = { user, start }

	return useSWRgql({
		key: mutation,
		values,
		swrDependencies: user,
	})
}

interface SinglePost {
	user: string
	postID: string
}

export const useGetSinglePost = ({ user, postID }: SinglePost) => {
	const values = { user, postID }
	return useSWRgql({
		key: getSinglePost,
		values,
		swrDependencies: postID,
	})
}

export const useGetNewsFeedPost = (start: number) => {
	const values = { start }
	const userID = useOwnUserId()

	return useSWRgql({
		key: getNewsFeedPost,
		values,
		swrDependencies: userID,
	})
}

export default useGetAllPost
