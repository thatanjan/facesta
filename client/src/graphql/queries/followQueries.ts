import { gql } from 'graphql-request'

export const getFollowers: string = gql`
	query getFollowers($otherUserID: ID!) {
		getFollowers(Input: { otherUserID: $otherUserID }) {
			followers {
				name
				id
			}
		}
	}
`

export const getFollowee: string = gql`
	query getFollowee($otherUserID: ID!) {
		getFollowee(Input: { otherUserID: $otherUserID }) {
			followee {
				name
				id
			}
		}
	}
`

export const getIsFollowee: string = gql`
	query getIsFollowee($otherUserID: ID!) {
		getIsFollowee(Input: { otherUserID: $otherUserID }) {
			isFollowee
		}
	}
`

export const getIsFollower: string = gql`
	query getIsFollower($otherUserID: ID!) {
		getIsFollower(Input: { otherUserID: $otherUserID }) {
			isFollower
		}
	}
`
