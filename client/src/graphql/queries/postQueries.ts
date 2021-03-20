import { gql } from 'graphql-request'

export const getAllPost = gql`
	query getAllPost($start: Int!, $user: ID!) {
		getAllPost(Input: { start: $start, user: $user }) {
			posts {
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
