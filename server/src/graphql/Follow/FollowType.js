import { gql } from 'apollo-server-express'
import { USER_ID_TYPE, ERROR_MESSAGE_TYPE } from 'variables/commonText'

const FollowType = gql`
    extend type Query {
        getFollowers(${USER_ID_TYPE}): Followers!
        getFollowees(${USER_ID_TYPE}): Followees!
        getIsFollowee(${USER_ID_TYPE}!): IsFollowee!
        getIsFollower(${USER_ID_TYPE}!): IsFollower!
    }

    extend type Mutation {
        followUser(${USER_ID_TYPE}!): ErrorOrMessage!
        unfollowUser(${USER_ID_TYPE}!): ErrorOrMessage!
    }


    type UserList {
        name: String!
        ${USER_ID_TYPE}!
    }

    type Followers {
        followers: [UserList]!
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
