import merge from 'lodash/merge'

import { UserResolvers } from './User/User'
import { PostResolvers } from './Post/Post'
import { ProfileResolvers } from './Profile/Profile'
import { FollowResolvers } from './Follow/Follow'
import unionTypeResolvers from './unionTypeResolvers'
import { DateResolvers } from './customScalars'
import { SearchResolvers } from './Search/Search'

const resolvers = merge(
	DateResolvers,
	UserResolvers,
	PostResolvers,
	ProfileResolvers,
	FollowResolvers,
	unionTypeResolvers,
	SearchResolvers
)

export default resolvers
