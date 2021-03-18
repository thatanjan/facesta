import { gql } from 'apollo-server-express'

const PostTypedefs = gql`
	extend type Query {
		getSinglePost(Input: GetPostInput!): SinglePost!
		getAllPost(user: ID!): ReturnAllPost!
		getNewsFeedPost: ReturnAllPost!
		getTotalLikes(Input: GetPostInput!): TotalLikes!
		getTotalComments(Input: GetPostInput!): TotalComments!
		getAllComments(Input: GetAllCommentsLikesInput!): GetAllComments!
		getAllLikes(Input: GetAllCommentsLikesInput!): GetAllLikes!
		hasLiked(Input: GetPostInput!): Boolean!
	}

	extend type Mutation {
		createPost(Input: CreatePostInput!): ErrorOrMessage!
		deletePost(postID: ID!): ErrorOrMessage!
		likePost(Input: GetPostInput!): ErrorOrMessage!
		removeLikePost(Input: GetPostInput!): ErrorOrMessage!
		commentPost(Input: CommentPostInput!): ErrorOrMessage!
		removeCommentPost(Input: RemoveCommentInput!): ErrorOrMessage!
		editPost(Input: EditPostInput!): ErrorOrMessage!
	}

	type GetAllLikes {
		users: [ID]!
	}

	type Comment {
		user: ID!
		text: String!
		date: Date!
	}

	type GetAllComments {
		comments: [Comment]
	}

	type TotalComments {
		totalComments: Int!
	}

	type TotalLikes {
		totalLikes: Int!
	}

	type Post {
		text: String!
		postID: ID!
		image: String!
		headline: String!
		markdown: Boolean!
	}

	type SinglePost {
		post: Post
		errorMessage: String
	}

	type ReturnAllPost {
		posts: [Post!]
		errorMessage: String
	}

	input GetPostInput {
		postID: ID!
		user: ID!
	}

	input CommentPostInput {
		text: String!
		postID: ID!
		user: ID!
	}

	input RemoveCommentInput {
		postID: ID!
		user: ID!
		commentID: ID!
	}

	input CreatePostInput {
		text: String!
		image: String!
		headline: String!
		markdown: Boolean!
	}

	input EditPostInput {
		postID: ID!
		text: String
		image: String
		headline: String
		markdown: Boolean
	}

	input GetAllPostInput {
		start: Int!
		user: ID!
	}

	input GetAllCommentsLikesInput {
		start: Int!
		postID: ID!
		user: ID!
	}
`
export default PostTypedefs
