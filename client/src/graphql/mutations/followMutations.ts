import { gql } from 'graphql-request'

// eslint-disable-next-line
export const unfollow: string = gql`
	mutation unfollowUser($otherUserID: ID!) {
		unfollowUser(Input: { otherUserID: $otherUserID }) {
			errorMessage
			message
		}
	}
`

export const follow: string = gql`
	mutation followUser($otherUserID: ID!) {
		followUser(Input: { otherUserID: $otherUserID }) {
			message
			errorMessage
		}
	}
`
