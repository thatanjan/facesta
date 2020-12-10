import merge from 'lodash/merge'

import { UserResolvers } from './User/User'
import { PostResolvers } from './Post/Post'

const resolvers = merge(UserResolvers, PostResolvers)

export default resolvers
