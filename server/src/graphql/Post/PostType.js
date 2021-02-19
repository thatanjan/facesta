import { gql } from 'apollo-server-express'
import { POST_ID_TYPE, POST_OWNER_ID_TYPE } from 'variables/commonText'

const text = `text: String!`

const PostTypedefs = gql`
    extend type Query {
        getSinglePost(Input: PostAndPostOwnerIDInput!): returnSinglePost!
        getAllPost(Input: PostOwnerIDInput!): returnAllPost!
        getNewsFeedPost: returnAllPost!
    }

    extend type Mutation {
        createPost(Input: CreatePostInput!): ErrorOrMessage!
        deletePost(Input: PostIDInput!): ErrorOrMessage!
        likePost(Input: PostAndPostOwnerIDInput!): ErrorOrMessage!
        removeLikePost(Input: PostAndPostOwnerIDInput!): ErrorOrMessage!
        commentPost(Input: PostAndPostOwnerIDInput!): ErrorOrMessage!
        removeCommentPost(Input: RemoveCommentInput!): ErrorOrMessage!
    }

    type Post {
       ${text} 
       ${POST_OWNER_ID_TYPE}
    }

    union returnSinglePost = Post | Error
    union returnAllPost = AllPost | Error

    type AllPost {
        posts: [Post]!
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

  input CreatePostInput {
    ${text}
  }

  input RemoveCommentInput {
    ${POST_ID_TYPE}!
    commentID: String!
  }

`
export default PostTypedefs
