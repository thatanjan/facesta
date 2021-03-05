import { gql } from 'graphql-request'
import { ERROR_OR_MESSAGE } from 'variables/global'

export const getAllPost = gql`
	query getAllPost($start: Int!, $postOwnerID: ID!) {
		getAllPost(Input: { start: $start, postOwnerID: $postOwnerID }) {
			posts {
				text
				postID
				${ERROR_OR_MESSAGE}
			}
		}
	}
`

export const getSinglePost = gql`
	query getSinglePost($postID: ID!, $postOwnerID: ID) {
		getSinglePost(Input: { postID: $postID, postOwnerID: $postOwnerID }) {
				text
				postID
				${ERROR_OR_MESSAGE}
		}
	}
`
