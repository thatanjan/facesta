import { gql } from 'graphql-request'

export const getAllPost = gql`
	query getAllPost($start: Int!, $postUserId: ID) {
		getAllPost(Input: { start: $start, postUserId: $postUserId }) {
			... on AllPost {
				posts {
					text
				}
			}

			... on Success {
				message
				errorMessage
				success
			}
		}
	}
`

export const getSinglePost = gql`
	query getSinglePost($postId: ID!, $postUserId: ID) {
		getSinglePost(Input: { postId: $postId, postUserId: $postUserId }) {
			... on Post {
				text
			}

			... on Success {
				message
				errorMessage
				success
			}
		}
	}
`
