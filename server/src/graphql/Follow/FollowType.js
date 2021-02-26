import { gql } from 'apollo-server-express'
import {
	ANY_USER_ID_TYPE,
	OTHER_USER_ID_TYPE,
	ERROR_MESSAGE_TYPE,
} from 'variables/commonText'

const FollowType = gql`
    extend type Query {
        getFollowers(Input: otherUserIdInput!): Followers!
        getFollowees(Input: otherUserIdInput!): Followees!
        getIsFollowee(Input: otherUserIdInput!): IsFollowee!
        getIsFollower(Input: otherUserIdInput!): IsFollower!
    }

    extend type Mutation {
        followUser(Input: otherUserIdInput!): ErrorOrMessage!
        unfollowUser(Input: otherUserIdInput!): ErrorOrMessage!
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

    input otherUserIdInput {
        ${OTHER_USER_ID_TYPE}!
    }
`

export default FollowType
