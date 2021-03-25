import { gql } from 'graphql-request'

// eslint-disable-next-line
export const createPost = gql`
	mutation createPost(
		$text: String!
		$image: String!
		$headline: String!
		$markdown: Boolean!
	) {
		createPost(
			Input: {
				text: $text
				image: $image
				headline: $headline
				markdown: $markdown
			}
		) {
			errorMessage
			message
		}
	}
`

export const likePost = gql`
	mutation likePost($postID: ID!, $user: ID!) {
		likePost(Input: { postID: $postID, user: $user }) {
			errorMessage
			message
		}
	}
`

export const removeLikePost = gql`
	mutation removeLikePost($postID: ID!, $user: ID!) {
		removeLikePost(Input: { postID: $postID, user: $user }) {
			errorMessage
			message
		}
	}
`

export const commentPost = gql`
	mutation commentPost($postID: ID!, $user: ID!, $text: String!) {
		commentPost(Input: { postID: $postID, user: $user, text: $text }) {
			errorMessage
			message
		}
	}
`

export const removeCommentPost = gql`
	mutation removeCommentPost(
		$postID: ID!
		$user: ID!
		$commentID: ID!
	) {
		removeCommentPost(
			Input: { postID: $postID, user: $user, commentID: $commentID }
		) {
			errorMessage
			message
		}
	}
`

export const editPost = gql`
	mutation editPost(
		$postID: ID!
		$text: String
		$image: String
		$headline: String
		$markdown: Boolean
	) {
		editPost(
			Input: {
				postID: $postID
				text: $text
				image: $image
				headline: $headline
				markdown: $markdown
			}
		) {
			errorMessage
			message
		}
	}
`
