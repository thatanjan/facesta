import { gql } from 'apollo-server-express'

const text = `text: String!`
const postId = `postId: ID!`
const postUserId = `postUserId: ID`

const userAndPostId = `
        ${postId}
        ${postUserId}
`

const PostTypedefs = gql`
    extend type Query {
        getSinglePost(Input: getSinglePost!): Post!
        getAllPost(Input: getAllPostInput!): AllPost!
    }

    extend type Mutation {
        createPost(Input: CreatePostInput!): Post!
        deletePost(Input: PostId!): Success!
        likePost(Input:PostId!): Success!
        removeLikePost(Input: PostId!): Success!
        commentPost(Input: commentInput!): Success!
        removeCommentPost(Input: removeCommentInput! ): Success!
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
        ${postUserId}
    }

    input commentInput{
        ${postId}
        ${text}
    }

    input removeCommentInput {
        ${userAndPostId}
        commentId: ID!
    }
`
export default PostTypedefs
