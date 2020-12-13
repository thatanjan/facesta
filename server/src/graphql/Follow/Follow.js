import merge from 'lodash/merge'

import FollowType from './FollowType'
import getFollowersAndFollowings from './getFollowersAndFollowings'

export const FollowTypedefs = [FollowType]

export const FollowResolvers = merge(getFollowersAndFollowings)
