import { gql } from 'graphql-request'

export const getAllPost = gql`
	query getAllPost($start: Int!, $user: ID!) {
		getAllPost(Input: { start: $start, user: $user }) {
			posts {
				text
				_id
				image
				headline
				markdown
			}
			errorMessage
		}
	}
`

export const getSinglePost = gql`
	query getSinglePost($postID: ID!, $user: ID!) {
		getSinglePost(Input: { postID: $postID, user: $user }) {
			text
			_id
			image
			headline
			markdown
		}
	}
`

export const getNewsFeedPost = gql`
	query getNewsFeedPost($start: Int!) {
		getNewsFeedPost(start: $start) {
			posts {
				user {
					name
					_id
				}

				post {
					text
					_id
					image
					headline
					markdown
				}
			}
			errorMessage
		}
	}
`

export const getTotalLikes = gql`
	query getTotalLikes($postID: ID!, $user: ID!) {
		getTotalLikes(Input: { postID: $postID, user: $user }) {
			totalLikes
			errorMessage
		}
	}
`

export const getTotalComments = gql`
	query getTotalComments($postID: ID!, $user: ID!) {
		getTotalComments(Input: { postID: $postID, user: $user }) {
			totalComments
			errorMessage
		}
	}
`

export const getAllComments = gql`
	query getAllComments($postID: ID!, $user: ID!, $start: Int!) {
		getAllComments(Input: { postID: $postID, user: $user, start: $start }) {
			comments {
				user {
					name
					_id
				}
				text
				date
			}
			errorMessage
		}
	}
`

export const getAllLikes = gql`
	query getAllLikes($postID: ID!, $user: ID!, $start: Int!) {
		getAllLikes(Input: { postID: $postID, user: $user, start: $start }) {
			users {
				name
				_id
			}
			errorMessage
		}
	}
`

export const hasLiked = gql`
	query hasLiked($postID: ID!, $user: ID!) {
		hasLiked(Input: { postID: $postID, user: $user })
	}
`
