import { gql } from 'apollo-server-express'
import {
	POST_ID_TYPE,
	POST_OWNER_ID_TYPE,
	ERROR_OR_MESSAGE_TYPE,
	USER_ID_TYPE,
	IMAGE,
} from 'variables/commonText'

const text = `text: String`

const PostTypedefs = gql`
    extend type Query {
        getSinglePost(Input: PostAndPostOwnerIDInput!): SinglePost!
        getAllPost(Input: GetAllPostInput!): ReturnAllPost!
        getNewsFeedPost: ReturnNewsFeedPosts!
        getTotalLikes(Input: PostAndPostOwnerIDInput!): TotalLikes!
        getTotalComments(Input: PostAndPostOwnerIDInput!): TotalComments!
        getAllComments(Input: GetAllCommentsLikesInput!): GetAllComments!
        getAllLikes(Input: GetAllCommentsLikesInput!): GetAllLikes!
        hasLiked(Input: PostAndPostOwnerIDInput!): Boolean!
    }

    extend type Mutation {
        createPost(Input: CreatePostInput!): ErrorOrMessage!
        deletePost(${POST_ID_TYPE}!): ErrorOrMessage!
        likePost(Input: PostAndPostOwnerIDInput!): ErrorOrMessage!
        removeLikePost(Input: PostAndPostOwnerIDInput!): ErrorOrMessage!
        commentPost(Input: CommentPost!): ErrorOrMessage!
        removeCommentPost(Input: RemoveCommentInput!): ErrorOrMessage!
        editPost(Input:EditPostInput!): ErrorOrMessage!
    }

    type GetAllLikes{
        users: [ID]!
    }

    type Comment {
        user: ID!
        text: String!
        date: Date!
    }

    type GetAllComments {
        comments : [Comment]
    } 

    type TotalComments {
        totalComments: Int!
    }

    type TotalLikes {
        totalLikes: Int!
    }

    type SinglePost {
       ${text}! 
       ${POST_ID_TYPE}!
       ${ERROR_OR_MESSAGE_TYPE}
       ${IMAGE}
       headline: String!
        markdown: Boolean!
    }

    type ReturnAllPost {
       posts: [SinglePost]
       ${ERROR_OR_MESSAGE_TYPE}
    }

    type SingleNewsFeedPost {
       ${text}! 
       ${POST_ID_TYPE}!
       ${POST_OWNER_ID_TYPE}!
       ${ERROR_OR_MESSAGE_TYPE}
    }

    type ReturnNewsFeedPosts {
       posts: [SingleNewsFeedPost!]
       ${ERROR_OR_MESSAGE_TYPE}
    }

    input PostAndPostOwnerIDInput{
      ${POST_ID_TYPE}!
      ${POST_OWNER_ID_TYPE}
    }

    input CommentPost {
      ${text}! 
      ${POST_ID_TYPE}!
      ${POST_OWNER_ID_TYPE}
    }

    input RemoveCommentInput {
      ${POST_ID_TYPE}!
      ${POST_OWNER_ID_TYPE}
      commentID: ID!
    }

    input CreatePostInput{
      ${text}!
      ${IMAGE}!
      headline: String!
      markdown: Boolean!
    }

    input EditPostInput{
      ${POST_ID_TYPE}!
      ${text}
      ${IMAGE}
      headline: String
      markdown: Boolean
    }

    input GetAllPostInput {
      start: Int!
      ${USER_ID_TYPE}
    }

    input GetAllCommentsLikesInput {
      start: Int!
      ${POST_ID_TYPE}!
      ${POST_OWNER_ID_TYPE}
    }
`
export default PostTypedefs
