import { gql } from 'apollo-server-express'

const PostTypedefs = gql`
    extend type Query {
        getSinglePost(input: PostId): Post!
        getAllPost(input: getAllPostInput!): AllPost!
    }

    extend type Mutation {
        createPost(input: CreatePostInput): Post!
        deletePost(input: PostId): Success!
    }

    type Post {
        text: String!
    }

    type AllPost {
        posts: [Post]!
    }

    input CreatePostInput {
        text: String!
    }

    input PostId {
        id: ID!
    }

    input getAllPostInput {
        start: Int!
    }
`

export default PostTypedefs
