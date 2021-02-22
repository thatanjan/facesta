import { gql } from 'apollo-server-express'
import {
	POST_ID_TYPE,
	POST_OWNER_ID_TYPE,
	ERROR_OR_MESSAGE_TYPE,
} from 'variables/commonText'

const text = `text: String`

const PostTypedefs = gql`
    extend type Query {
        getSinglePost(Input: PostAndPostOwnerIDInput!): Post!
        getAllPost(Input: PostOwnerIDInput!): AllPost!
        getNewsFeedPost: ReturnAllPost!
    }

    extend type Mutation {
        createPost(Input: CreatePostInput!): ErrorOrMessage!
        deletePost(Input: PostIDInput!): ErrorOrMessage!
        likePost(Input: PostAndPostOwnerIDInput!): ErrorOrMessage!
        removeLikePost(Input: PostAndPostOwnerIDInput!): ErrorOrMessage!
        commentPost(Input: commentPost!): ErrorOrMessage!
        removeCommentPost(Input: RemoveCommentInput!): ErrorOrMessage!
    }

    type Post {
       ${text}! 
       ${POST_ID_TYPE}!
       ${POST_OWNER_ID_TYPE}!
       ${ERROR_OR_MESSAGE_TYPE}
    }

    type ReturnAllPost {
       posts: [Post]!
       ${ERROR_OR_MESSAGE_TYPE}
    }

    type Post2{
       ${text}! 
       ${POST_ID_TYPE}!
       ${ERROR_OR_MESSAGE_TYPE}
    }

    type AllPost {
       posts: [Post2]!
       ${POST_OWNER_ID_TYPE}!
       ${ERROR_OR_MESSAGE_TYPE}
    }


    input PostIDInput{
       ${POST_ID_TYPE}!
    }

    input PostOwnerIDInput {
      ${POST_OWNER_ID_TYPE}!
    }

    input PostAndPostOwnerIDInput{
      ${POST_ID_TYPE}!
      ${POST_OWNER_ID_TYPE}!
    }

    input commentPost {
      ${text}! 
      ${POST_ID_TYPE}!
      ${POST_OWNER_ID_TYPE}!
    }

    input CreatePostInput {
      ${text}
    }

    input RemoveCommentInput {
      ${POST_ID_TYPE}!
      commentID: String!
    }

`
export default PostTypedefs
