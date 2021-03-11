import { gql } from 'graphql-request'

// eslint-disable-next-line
export const unfollow: string = gql`
	mutation unfollowUser($userID: ID!) {
		unfollowUser(userID: $userID) {
			errorMessage
			message
		}
	}
`

export const follow: string = gql`
	mutation followUser($userID: ID!) {
		followUser(userID: $userID) {
			message
			errorMessage
		}
	}
`
