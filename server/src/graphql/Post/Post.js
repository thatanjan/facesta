import merge from 'lodash/merge'

import PostType from 'graphql/Post/PostType'
import createDeletePost from 'graphql/Post/createDeletePost'

export const PostTypedefs = [PostType]

export const PostResolvers = merge(createDeletePost)
