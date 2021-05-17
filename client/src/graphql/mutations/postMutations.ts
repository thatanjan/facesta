import { gql } from 'graphql-request'

// eslint-disable-next-line
export const createPost = gql`
	mutation createPost(
		$content: String!
		$image: String!
		$title: String!
		$markdown: Boolean!
	) {
		createPost(
			Input: {
				content: $content
				image: $image
				title: $title
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
	mutation removeCommentPost($postID: ID!, $user: ID!, $commentID: ID!) {
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
		$content: String
		$image: String
		$title: String
		$markdown: Boolean
	) {
		editPost(
			Input: {
				postID: $postID
				content: $content
				image: $image
				title: $title
				markdown: $markdown
			}
		) {
			errorMessage
			message
		}
	}
`
