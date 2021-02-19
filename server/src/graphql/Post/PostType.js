import { gql } from 'apollo-server-express'
import { POST_ID_TYPE, POST_OWNER_ID_TYPE } from 'variables/commonText'

const text = `text: String!`

const PostTypedefs = gql`
    extend type Query {
        getSinglePost(Input: PostAndPostOwnerIDInput!): ReturnSinglePost!
        getAllPost(Input: PostOwnerIDInput!): ReturnAllPost!
        getNewsFeedPost: ReturnAllPost!
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

    union ReturnSinglePost = Post | Error
    union ReturnAllPost = AllPost | Error

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
