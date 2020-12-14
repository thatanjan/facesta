import { gql } from 'apollo-server-express'

const PostTypedefs = gql`
    extend type Mutation {
        createPost(input: CreatePostInput): Post!
        deletePost(input: PostId): Success!
    }

    type Post {
        text: String!
    }

    input CreatePostInput {
        text: String!
    }

    input PostId {
        id: ID!
    }
`

export default PostTypedefs
