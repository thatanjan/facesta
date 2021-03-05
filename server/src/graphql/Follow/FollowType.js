import { gql } from 'apollo-server-express'
import { ANY_USER_ID_TYPE, ERROR_MESSAGE_TYPE } from 'variables/commonText'

const FollowType = gql`
    extend type Query {
        getFollowers(${ANY_USER_ID_TYPE}): Followers!
        getFollowees(${ANY_USER_ID_TYPE}): Followees!
        getIsFollowee(${ANY_USER_ID_TYPE}!): IsFollowee!
        getIsFollower(${ANY_USER_ID_TYPE}!): IsFollower!
    }

    extend type Mutation {
        followUser(${ANY_USER_ID_TYPE}!): ErrorOrMessage!
        unfollowUser(${ANY_USER_ID_TYPE}!): ErrorOrMessage!
    }


    type UserList {
        name: String!
        ${ANY_USER_ID_TYPE}!
    }

    type Followers {
        followers: [UserList]
        ${ERROR_MESSAGE_TYPE}
    }

    type Followees{
        followees: [UserList]
        ${ERROR_MESSAGE_TYPE}
    }


    type IsFollowee{
        isFollowee: Boolean!
        ${ERROR_MESSAGE_TYPE}!
    }

    type IsFollower {
        isFollower: Boolean!
        ${ERROR_MESSAGE_TYPE}!
    }


`

export default FollowType
