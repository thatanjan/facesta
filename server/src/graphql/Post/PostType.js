import { gql } from 'apollo-server-express'
import {
	POST_ID_TYPE,
	POST_OWNER_ID_TYPE,
	ERROR_OR_MESSAGE_TYPE,
	USER_ID_TYPE,
} from 'variables/commonText'

const text = `text: String`

const imageURL = `imageURL: String`

const PostTypedefs = gql`
    extend type Query {
        getSinglePost(Input: PostAndPostOwnerIDInput!): SinglePost!
        getAllPost(Input: GetAllPostInput!): ReturnAllPost!
        getNewsFeedPost: ReturnNewsFeedPosts!
    }

    extend type Mutation {
        createPost(${text}!): ErrorOrMessage!
        deletePost(${POST_ID_TYPE}!): ErrorOrMessage!
        likePost(Input: PostAndPostOwnerIDInput!): ErrorOrMessage!
        removeLikePost(Input: PostAndPostOwnerIDInput!): ErrorOrMessage!
        commentPost(Input: CommentPost!): ErrorOrMessage!
        removeCommentPost(Input: RemoveCommentInput!): ErrorOrMessage!
    }

    type SinglePost {
       ${text}! 
       ${POST_ID_TYPE}!
       ${ERROR_OR_MESSAGE_TYPE}
       ${imageURL}
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
      ${imageURL}
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

    input GetAllPostInput {
      start: Int!
      ${USER_ID_TYPE}
    }
`
export default PostTypedefs
