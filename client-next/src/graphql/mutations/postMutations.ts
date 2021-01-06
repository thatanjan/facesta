import { gql } from 'graphql-request'

export const getAllPost = gql`
	query getAllPost($start: Int!) {
		getAllPost(input: { start: $start }) {
			posts {
				text
			}
		}
	}
`

export const getSinglePost = gql`
	query getSinglePost($postId: ID!) {
		getSinglePost(input: { postId: $postId }) {
			text
		}
	}
`
