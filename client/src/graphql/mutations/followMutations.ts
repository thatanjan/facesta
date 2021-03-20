import { gql } from 'graphql-request'

export const unfollow: string = gql`
	mutation unfollowUser($user: ID!) {
		unfollowUser(user: $user) {
			errorMessage
			message
		}
	}
`

export const follow: string = gql`
	mutation followUser($user: ID!) {
		followUser(user: $user) {
			message
			errorMessage
		}
	}
`
