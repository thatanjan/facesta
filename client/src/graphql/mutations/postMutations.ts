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
	mutation likePost($postID: String!, $user: String!) {
		likePost(Input: { postID: $postID, user: $user }) {
			errorMessage
			message
		}
	}
`

export const removeLikePost = gql`
	mutation removeLikePost($postID: String!, $user: String!) {
		removeLikePost(Input: { postID: $postID, user: $user }) {
			errorMessage
			message
		}
	}
`

export const commentPost = gql`
	mutation commentPost($postID: String!, $user: String!, $text: String!) {
		commentPost(Input: { postID: $postID, user: $user, text: $text }) {
			errorMessage
			message
		}
	}
`

export const removeCommentPost = gql`
	mutation removeCommentPost(
		$postID: String!
		$user: String!
		$commentID: String!
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
