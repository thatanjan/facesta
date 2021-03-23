import {
	getAllPost,
	getSinglePost,
	getNewsFeedPost,
} from 'graphql/queries/postQueries'
import fetcher, { Parameters as FetcherParameters } from 'utils/swrFetcher'
import createRequest from 'utils/createRequest'
import useSWRgql from 'hooks/useSWRgql'
import { useSWRInfinite } from 'swr'
import { useOwnUserId } from 'hooks/userhooks'
import { useProfileUserID } from 'hooks/profileContextHooks'
import { useEffect, useState } from 'react'

const useGetAllPost = (skip: number) => {
	const mutation = getAllPost
	const user = useProfileUserID()
	const values = { user, skip }

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

export const useGetNewsFeedPost = (skip: number) => {
	const userID = useOwnUserId()

	const getKey = () => [getNewsFeedPost, skip, userID]

	return useSWRInfinite(getKey, async (key, num) =>
		createRequest({ key, values: { skip: num } })
	)
}

export default useGetAllPost
