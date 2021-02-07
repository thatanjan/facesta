import { gql } from 'apollo-server-express'

const FollowType = gql`
    extend type Query {
        getFollowers(Input: otherUserId): Followers!
        getFollowing(Input: otherUserId): Following!
        getIsFollowing(Input: otherUserId): IsFollowing!
        getIsFollower(Input: otherUserId): IsFollower!
    }

    extend type Mutation {
        followUser(Input: otherUserId): Success!
        unfollowUser(Input: otherUserId): Success!
    }

    type UserList {
        name: String!
        id: ID!
    }

    type Followers {
        followers: [UserList]!
    }

    type Following {
        following: [UserList]!
    }

    type Success {
        message: String!
        errorMessage: String!
        success: Boolean!
    }

    type IsFollowing {
        isFollowing: Boolean!
    }

    type IsFollower {
        isFollower: Boolean!
    }
    input otherUserId {
        otherUserId: ID!
    }
`

export default FollowType
