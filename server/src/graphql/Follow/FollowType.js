import { gql } from 'apollo-server-express'

const FollowType = gql`
    extend type Query {
        getFollowers(Input: userId): Followers!
        getFollowing(Input: userId): Following!
        isFollowing(Input: userId): Boolean!
    }

    extend type Mutation {
        followUser(Input: userId): Success!
        unfollowUser(Input: userId): Success!
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

    input userId {
        userId: ID!
    }
`

export default FollowType
