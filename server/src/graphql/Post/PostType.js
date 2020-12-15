import { gql } from 'apollo-server-express'

const text = `text: String!`
const id = `id: ID!`

const userAndPostId = `
        user: ID!
        post: ID!
`

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
            removeCommentPost(input: removeCommentInput ): Success!
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
        ${userAndPostId}
    }


    input getAllPostInput {
        start: Int!
        ${id}
    }

    input commentInput{
        ${id}
        ${text}
    }

    input removeCommentInput {
        postId: ID!
        commentId: ID!
    }
`
export default PostTypedefs
