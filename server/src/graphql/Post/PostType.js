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
        createPost(Input: CreatePostInput!): Post!
        deletePost(Input: PostId!): Success!
        likePost(Input: userAndPostId!): Success!
        removeLikePost(Input: userAndPostId!): Success!
        commentPost(Input: commentInput!): Success!
        removeCommentPost(Input: removeCommentInput! ): Success!
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

`
export default PostTypedefs
