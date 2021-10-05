import merge from 'lodash/merge'

import PostType from 'graphql/Post/PostType'
import createDeletePost from 'graphql/Post/createDeletePost'
import getSinglePost from 'graphql/Post/getSinglePost'
import likePost from 'graphql/Post/likePost'
import commentPost from 'graphql/Post/commentPost'
import editPost from 'graphql/Post/editPost'
import getTotal from 'graphql/Post/getTotal'
import getLikeComment from 'graphql/Post/getLikeComment'
import getNewsFeedPost from 'graphql/Post/getNewsFeedPost'

export const PostTypedefs = [PostType]

export const PostResolvers = merge(
	createDeletePost,
	getSinglePost,
	commentPost,
	likePost,
	editPost,
	getTotal,
	getLikeComment,
	getNewsFeedPost
)
