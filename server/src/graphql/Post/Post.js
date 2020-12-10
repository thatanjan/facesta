import merge from 'lodash/merge'

import PostType from 'graphql/Post/PostType'
import createPost from 'graphql/Post/createPost'

export const PostTypedefs = [PostType]

export const PostResolvers = merge(createPost)
