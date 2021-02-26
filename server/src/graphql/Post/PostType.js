import { gql } from 'apollo-server-express'
import {
	POST_ID_TYPE,
	POST_OWNER_ID_TYPE,
	ERROR_OR_MESSAGE_TYPE,
} from 'variables/commonText'

const text = `text: String`

const PostTypedefs = gql`
    extend type Query {
        getSinglePost(Input: PostAndPostOwnerIDInput!): SinglePost!
        getAllPost(Input: GetAllPostInput!): ReturnAllPost!
        getNewsFeedPost: ReturnNewsFeedPosts!
    }

    extend type Mutation {
        createPost(Input: CreatePostInput!): ErrorOrMessage!
        deletePost(Input: PostIDInput!): ErrorOrMessage!
        likePost(Input: PostAndPostOwnerIDInput!): ErrorOrMessage!
        removeLikePost(Input: PostAndPostOwnerIDInput!): ErrorOrMessage!
        commentPost(Input: commentPost!): ErrorOrMessage!
        removeCommentPost(Input: RemoveCommentInput!): ErrorOrMessage!
    }

    type SinglePost {
       ${text}! 
       ${POST_ID_TYPE}!
       ${ERROR_OR_MESSAGE_TYPE}
    }

    type ReturnAllPost {
       posts: [SinglePost]!
       ${ERROR_OR_MESSAGE_TYPE}
    }

    type SingleNewsFeedPost {
       ${text}! 
       ${POST_ID_TYPE}!
       ${POST_OWNER_ID_TYPE}!
       ${ERROR_OR_MESSAGE_TYPE}
    }

    type ReturnNewsFeedPosts {
       posts: [SingleNewsFeedPost]!
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
      commentID: ID!
    }

    input GetAllPostInput {
      start: Int!
      ${POST_OWNER_ID_TYPE}!
    }

`
export default PostTypedefs
