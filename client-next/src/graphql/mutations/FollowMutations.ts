import { gql } from 'graphql-request'

// eslint-disable-next-line
export const unfollow: string = gql`
	mutation unfollowUser($userId: ID!) {
		unfollowUser(Input: { userId: $userId }) {
			success
			errorMessage
		}
	}
`

export const follow: string = gql`
	mutation followUser($userId: ID!) {
		unfollowUser(Input: { userId: $userId }) {
			success
			errorMessage
		}
	}
`
