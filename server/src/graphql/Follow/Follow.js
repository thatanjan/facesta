import merge from 'lodash/merge'

import FollowType from './FollowType'
import getFollowersAndFollowings from './getFollowersAndFollowings'
import followAndUnfollow from './followAndUnfollow'
import getRecommendedToFollow from './getRecommendedToFollow'

export const FollowTypedefs = [FollowType]

export const FollowResolvers = merge(
	getFollowersAndFollowings,
	followAndUnfollow,
	getRecommendedToFollow
)
