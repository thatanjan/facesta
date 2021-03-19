import { gql } from 'apollo-server-express'

const PostTypedefs = gql`
	extend type Query {
		getSinglePost(Input: GetPostInput!): SinglePost!
		getAllPost(Input: GetAllPostInput!): ReturnAllPost!
		getNewsFeedPost(start: Int!): NewsFeedPosts!
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

	type UserNameAndID {
		name: String!
		_id: ID!
	}

	type SingleNewsFeedPost {
		user: UserNameAndID!
		post: Post!
	}

	type NewsFeedPosts {
		posts: [SingleNewsFeedPost]
		errorMessage: String
	}

	type GetAllLikes {
		users: [UserNameAndID]!
		errorMessage: String
	}

	type Comment {
		user: UserNameAndID!
		text: String!
		date: Date!
	}

	type GetAllComments {
		comments: [Comment]
		errorMessage: String
	}

	type TotalComments {
		totalComments: Int!
		errorMessage: String
	}

	type TotalLikes {
		totalLikes: Int!
		errorMessage: String
	}

	type Post {
		text: String!
		_id: ID!
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

	input GetAllPostInput {
		user: ID!
		start: Int!
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

	input GetAllCommentsLikesInput {
		start: Int!
		postID: ID!
		user: ID!
	}
`
export default PostTypedefs
