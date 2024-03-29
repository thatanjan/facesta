import { gql } from 'graphql-request'

// eslint-disable-next-line
export const createPost = gql`
	mutation createPost(
		$text: String!
		$images: [String!]!
		$title: String!
		$markdown: Boolean!
	) {
		createPost(
			Input: { text: $text, images: $images, title: $title, markdown: $markdown }
		) {
			errorMessage
			message
		}
	}
`

export const likePost = gql`
	mutation likePost($postID: ID!) {
		likePost(Input: { postID: $postID }) {
			errorMessage
			message
		}
	}
`

export const removeLikePost = gql`
	mutation removeLikePost($postID: ID!) {
		removeLikePost(Input: { postID: $postID }) {
			errorMessage
			message
		}
	}
`

export const commentPost = gql`
	mutation commentPost($postID: ID!, $text: String!) {
		commentPost(Input: { postID: $postID, text: $text }) {
			errorMessage
			message
		}
	}
`

export const removeCommentPost = gql`
	mutation removeCommentPost($postID: ID!, $commentID: ID!) {
		removeCommentPost(Input: { postID: $postID, commentID: $commentID }) {
			errorMessage
			message
		}
	}
`

export const editCommentPost = gql`
	mutation editComment($postID: ID!, $commentID: ID!, $text: String!) {
		editComment(Input: { postID: $postID, commentID: $commentID, text: $text }) {
			errorMessage
			message
		}
	}
`

export const editPost = gql`
	mutation editPost(
		$postID: ID!
		$text: String
		$title: String
		$markdown: Boolean
	) {
		editPost(
			Input: { postID: $postID, text: $text, title: $title, markdown: $markdown }
		) {
			errorMessage
			message
		}
	}
`

export const deletePost = gql`
	mutation deletePost($postID: ID!) {
		deletePost(postID: $postID) {
			errorMessage
			message
		}
	}
`
