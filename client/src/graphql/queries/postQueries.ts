import { gql } from 'graphql-request'
import { ERROR_MESSAGE, ERROR_OR_MESSAGE } from 'variables/global'

export const getAllPost = gql`
	query getAllPost($start: Int!, $userID: ID) {
		getAllPost(Input: { start: $start, userID: $userID }) {
			posts {
				text
				postID
				image
				headline 
				${ERROR_MESSAGE}
			}
				${ERROR_OR_MESSAGE}
		}
	}
`

export const getSinglePost = gql`
	query getSinglePost($postID: ID!, $postOwnerID: ID) {
		getSinglePost(Input: { postID: $postID, postOwnerID: $postOwnerID }) {
				text
				postID
				image
				headline 
				${ERROR_MESSAGE}
		}
	}
`
