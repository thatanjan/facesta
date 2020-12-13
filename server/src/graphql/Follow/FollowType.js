import { gql } from 'apollo-server-express'

const FollowType = gql`
    extend type Query {
        getFollowers(input: userId): users!
        getFollowing(input: userId): users!
        isFollowing(input: userId): Boolean!
    }

    extend type Mutation {
        followUser(input: userId): Success!
        unfollowUser(input: userId): success!
    }

    type Users {
        users: [ID]!
    }

    type Success {
        success: Boolean!
    }

    input userId {
        id: ID!
    }
`

export default FollowType
