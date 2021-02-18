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
        getSinglePost(Input: userAndPostId!): returnSinglePost!
        getAllPost(Input: getAllPostInput!): returnAllPost!
        getNewsFeedPost(Input: ownUserId!): returnAllPost!
    }

    extend type Mutation {
        createPost(Input: CreatePostInput!): Post!
        deletePost(Input: PostId!): Success!
        likePost(Input: userAndPostId!): Success!
        removeLikePost(Input: userAndPostId!): Success!
        commentPost(Input: commentInput!): Success!
        removeCommentPost(Input: removeCommentInput! ): Success!
    }

    type Post {
       ${text} 
    }

    union returnSinglePost = Post | Success
    union returnAllPost = AllPost | Success

    type AllPost {
        posts: [Post]!
    }

    input CreatePostInput {
        ${text}
    }

    input PostId {
        ${postId}
    }

    input userAndPostId {
        ${userAndPostId}
    }


    input getAllPostInput {
        start: Int!
        ${userAndPostId}
    }

    input commentInput{
        ${userAndPostId}
        ${text}
    }

    input removeCommentInput {
        ${userAndPostId}
        commentId: ID!
    }

    input ownUserId {
        ownUserId: ID!
    }

`
export default PostTypedefs
