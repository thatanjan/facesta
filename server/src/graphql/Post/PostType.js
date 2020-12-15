import { gql } from 'apollo-server-express'

const text = `text: String!`
const id = `id: ID!`

const PostTypedefs = gql`
    extend type Query {
        getSinglePost(input: getSinglePost): Post!
        getAllPost(input: getAllPostInput!): AllPost!
    }

    extend type Mutation {
        createPost(input: CreatePostInput): Post!
        deletePost(input: PostId): Success!
        likePost(input:PostId): Success!
        removeLike(input: PostId): Success!
        commentPost(input: commentInput): Success!
    }

    type Post {
       ${text} 
    }

    type AllPost {
        posts: [Post]!
    }

    input CreatePostInput {
        ${text}
    }

    input PostId {
        ${id}
    }

    input getSinglePost{
        user: ID!
        post: ID!
    }


    input getAllPostInput {
        start: Int!
        ${id}
    }

    input commentInput{
        ${id}
        ${text}
    }
`
export default PostTypedefs
