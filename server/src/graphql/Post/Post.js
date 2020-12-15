import merge from 'lodash/merge'

import PostType from 'graphql/Post/PostType'
import createDeletePost from 'graphql/Post/createDeletePost'
import getPost from 'graphql/Post/getPost'
import likePost from 'graphql/Post/likePost'
import commentPost from 'graphql/Post/commentPost'

export const PostTypedefs = [PostType]

export const PostResolvers = merge(
    createDeletePost,
    getPost,
    commentPost,
    likePost
)
