import { gql } from 'graphql-request'

export const getFollowers: string = gql`
	query getFollowers($id: ID!) {
		getFollowers(id: $id) {
			followers
		}
	}
`

export const getFollowing: string = gql`
	query getFollowing($id: ID!) {
		getFollowing(id: $id) {
			following
		}
	}
`
