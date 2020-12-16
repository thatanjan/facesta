import { gql } from 'apollo-server-express'

const text = `text: String!`
const postId = `postId: ID!`
const userId = `userId: ID!`

const userAndPostId = `
        ${postId}
        ${userId}
`

const PostTypedefs = gql`
    extend type Query {
        getSinglePost(input: getSinglePost!): Post!
        getAllPost(input: getAllPostInput!): AllPost!
    }

    extend type Mutation {
        createPost(input: CreatePostInput!): Post!
        deletePost(input: PostId!): Success!
        likePost(input:PostId!): Success!
        removeLike(input: PostId!): Success!
        commentPost(input: commentInput!): Success!
        removeCommentPost(input: removeCommentInput! ): Success!
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
        ${postId}
    }

    input getSinglePost{
        ${userAndPostId}
    }


    input getAllPostInput {
        start: Int!
        ${postId}
    }

    input commentInput{
        ${postId}
        ${text}
    }

    input removeCommentInput {
        ${postId}
        commentId: ID!
    }
`
export default PostTypedefs
