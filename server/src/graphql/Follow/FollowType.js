import { gql } from 'apollo-server-express'

const FollowType = gql`
    extend type Query {
        getFollowers(input: userId): Followers!
        getFollowing(input: userId): Following!
        isFollowing(input: userId): Boolean!
    }

    extend type Mutation {
        followUser(input: userId): Success!
        unfollowUser(input: userId): Success!
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
