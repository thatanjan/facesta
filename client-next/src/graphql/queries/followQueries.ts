import { gql } from 'graphql-request'

export const getFollowers: string = gql`
	query getFollowers($userId: ID!) {
		getFollowers(Input: { userId: $userId }) {
			followers {
				name
				id
			}
		}
	}
`

export const getFollowing: string = gql`
	query getFollowing($userId: ID!) {
		getFollowing(Input: { userId: $userId }) {
			following {
				name
				id
			}
		}
	}
`
