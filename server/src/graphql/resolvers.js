import merge from 'lodash/merge'

import { UserResolvers } from './User/User'
import { PostResolvers } from './Post/Post'
import { ProfileResolvers } from './Profile/Profile'
import { DateResolvers } from 'graphql/customScalars/dateScalar'

const resolvers = merge(
    DateResolvers,
    UserResolvers,
    PostResolvers,
    ProfileResolvers
)

export default resolvers
