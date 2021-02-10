import { gql } from 'graphql-request'

export const getFollowers: string = gql`
	query getFollowers($otherUserId: ID!) {
		getFollowers(Input: { otherUserId: $otherUserId }) {
			followers {
				name
				id
			}
		}
	}
`

export const getFollowing: string = gql`
	query getFollowing($otherUserId: ID!) {
		getFollowing(Input: { otherUserId: $otherUserId }) {
			following {
				name
				id
			}
		}
	}
`

export const getIsFollowing: string = gql`
	query getIsFollowing($otherUserId: ID!) {
		getIsFollowing(Input: { otherUserId: $otherUserId }) {
			isFollowing
		}
	}
`

export const getIsFollower: string = gql`
	query getIsFollower($otherUserId: ID!) {
		getIsFollower(Input: { otherUserId: $otherUserId }) {
			isFollower
		}
	}
`
