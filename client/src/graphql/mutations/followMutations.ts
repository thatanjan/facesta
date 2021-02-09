import { gql } from 'graphql-request'

// eslint-disable-next-line
export const unfollow: string = gql`
	mutation unfollowUser($userId: ID!) {
		unfollowUser(Input: { userId: $userId }) {
			success
			errorMessage
			message
		}
	}
`

export const follow: string = gql`
	mutation followUser($userId: ID!) {
		followUser(Input: { userId: $userId }) {
			success
			message
			errorMessage
		}
	}
`
