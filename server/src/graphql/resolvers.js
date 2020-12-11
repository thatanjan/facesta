import merge from 'lodash/merge'

import { UserResolvers } from './User/User'
import { PostResolvers } from './Post/Post'
import { DateResolvers } from 'graphql/customScalars/dateScalar'

const resolvers = merge(UserResolvers, PostResolvers, DateResolvers)

export default resolvers
