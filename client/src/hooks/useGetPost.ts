import {
	getAllPost,
	getSinglePost,
	getNewsFeedPost,
	getAllPostNoAuth,
} from 'graphql/queries/postQueries'
import createRequest from 'utils/createRequest'
import useSWRgql from 'hooks/useSWRgql'
import { useSWRInfinite } from 'swr'

import { useUserID, useProfileUserID } from 'redux/hooks/stateHooks'

import { AnyObject } from 'interfaces/global'

const useGetAllPost = () => {
	const profileUser = useProfileUserID()
	const user = useUserID()

	const getKey = (index: number, previousPageData: AnyObject) => {
		if (previousPageData && previousPageData.getAllPost.posts.length === 0)
			return null
		const skipnum: number = (index + 1) * 10

		return [user ? getAllPost : getAllPostNoAuth, skipnum, profileUser]
	}

	return useSWRInfinite(
		getKey,
		async (key, num) =>
			createRequest({ key, values: { skip: num, user: profileUser } }),
		{ revalidateOnFocus: false }
	)
}

interface SinglePost {
	postID: string
}

export const useGetSinglePost = ({ postID }: SinglePost) => {
	const values = { postID }
	return useSWRgql({
		key: getSinglePost,
		values,
		swrDependencies: postID,
	})
}

export const useGetNewsFeedPost = () => {
	const userID = useUserID()

	const getKey = (index: number, previousPageData: AnyObject) => {
		if (!userID) return null

		if (previousPageData && previousPageData.getNewsFeedPost.posts.length === 0)
			return null

		if (previousPageData && previousPageData.getNewsFeedPost.errorMessage)
			return null

		const skipnum: number = (index + 1) * 10

		return [getNewsFeedPost, skipnum, userID]
	}

	return useSWRInfinite(
		getKey,
		async (key, num) => createRequest({ key, values: { skip: num } }),
		{ revalidateOnFocus: false }
	)
}

export default useGetAllPost
