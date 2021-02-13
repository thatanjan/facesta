import { gql } from 'graphql-request'

// eslint-disable-next-line
export const unfollow: string = gql`
	mutation unfollowUser($otherUserId: ID!) {
		unfollowUser(Input: { otherUserId: $otherUserId }) {
			success
			errorMessage
			message
		}
	}
`

export const follow: string = gql`
	mutation followUser($otherUserId: ID!) {
		followUser(Input: { otherUserId: $otherUserId }) {
			success
			message
			errorMessage
		}
	}
`
