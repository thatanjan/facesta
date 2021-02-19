import { gql } from 'apollo-server-express'
import { ANY_USER_ID_TYPE, OTHER_USER_ID_TYPE } from 'variables/commonText'

const FollowType = gql`
    extend type Query {
        getFollowers(Input: otherUserId!): returnFollowers!
        getFollowees(Input: otherUserId!): returnFollowees!
        getIsFollowee(Input: otherUserId!): returnIsFollowee!
        getIsFollower(Input: otherUserId!): returnIsFollower!
    }

    extend type Mutation {
        followUser(Input: otherUserId!): ErrorOrMessage!
        unfollowUser(Input: otherUserId!): ErrorOrMessage!
    }

    union returnFollowers = Followers | Error
    union returnFollowees = Followees | Error

    union returnIsFollowee = IsFollowee | Error
    union returnIsFollower = IsFollower | Error

    type UserList {
        name: String!
        ${ANY_USER_ID_TYPE}!
    }

    type Followers {
        followers: [UserList]!
    }

    type Followees{
        followees: [UserList]!
    }


    type IsFollowee{
        isFollowee: Boolean!
    }

    type IsFollower {
        isFollower: Boolean!
    }

    input otherUserId {
        ${OTHER_USER_ID_TYPE}!
    }
`

export default FollowType
