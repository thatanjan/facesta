import { gql } from 'apollo-server-express'

const PostTypedefs = gql`
    extend type Mutation {
        createPost(input: CreatePostInput): Post!
    }

    type Post {
        text: String!
    }

    input CreatePostInput {
        text: String!
    }
`

export default PostTypedefs
