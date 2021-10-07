import { gql } from 'graphql-request'

export const getAllPost = gql`
	query getAllPost($skip: Int!, $user: ID!) {
		getAllPost(Input: { skip: $skip, user: $user }) {
			posts {
				text
				_id
				images
				title
				markdown
				totalLikes
				totalComments
				date
				hasLiked
			}
			errorMessage
		}
	}
`

export const getAllPostNoAuth = gql`
	query getAllPost($skip: Int!, $user: ID!) {
		getAllPost(Input: { skip: $skip, user: $user }) {
			posts {
				text
				_id
				images
				title
				markdown
				date
			}
			errorMessage
		}
	}
`

export const getSinglePost = gql`
	query getSinglePost($postID: ID!) {
		getSinglePost(Input: { postID: $postID }) {
			post {
				text
				_id
				images
				title
				markdown
				totalLikes
				totalComments
				date
				hasLiked

				user {
					_id

					profile {
						name
						profilePicture
					}
				}
			}
		}
	}
`

export const getNewsFeedPost = gql`
	query getNewsFeedPost($skip: Int!) {
		getNewsFeedPost(skip: $skip) {
			posts {
				text
				_id
				images
				title
				markdown
				totalLikes
				totalComments
				date
				hasLiked

				user {
					_id

					profile {
						name
						profilePicture
					}
				}
			}
			errorMessage
		}
	}
`

export const getTotalLikes = gql`
	query getTotalLikes($postID: ID!) {
		getTotalLikes(Input: { postID: $postID }) {
			totalLikes
			errorMessage
		}
	}
`

export const getTotalComments = gql`
	query getTotalComments($postID: ID!) {
		getTotalComments(Input: { postID: $postID }) {
			totalComments
			errorMessage
		}
	}
`

export const getAllComments = gql`
	query getAllComments($postID: ID!, $skip: Int!) {
		getAllComments(Input: { postID: $postID, skip: $skip }) {
			comments {
				date
				text
				user {
					_id
					profile {
						name
						profilePicture
					}
				}
				_id
			}
			errorMessage
		}
	}
`

export const getAllLikes = gql`
	query getAllLikes($postID: ID!, $skip: Int!) {
		getAllLikes(Input: { postID: $postID, skip: $skip }) {
			users {
				_id

				profile {
					name
					profilePicture
				}
			}
			errorMessage
		}
	}
`

export const hasLiked = gql`
	query hasLiked($postID: ID!) {
		hasLiked(Input: { postID: $postID })
	}
`
