import merge from 'lodash/merge'

import FollowType from './FollowType'
import getFollowersAndFollowings from './getFollowersAndFollowings'
import followAndUnfollow from './followAndUnfollow'

export const FollowTypedefs = [FollowType]

export const FollowResolvers = merge(
    getFollowersAndFollowings,
    followAndUnfollow
)
