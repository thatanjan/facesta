import { gql } from 'graphql-request'

export const getFollowers: string = gql`
	query getFollowers($user: ID!, $skip: Int!) {
		getFollowers(Input: { user: $user, skip: $skip }) {
			followers {
				name
				_id
			}
			errorMessage
		}
	}
`

export const getFollowees: string = gql`
	query getFollowees($user: ID!, $skip: ID!) {
		getFollowees(user: $user) {
			followees {
				name
				_id
			}
			errorMessage
		}
	}
`

export const getIsFollowee: string = gql`
	query getIsFollowee($user: ID!) {
		getIsFollowee(user: $user) {
			isFollowee
			errorMessage
		}
	}
`

export const getIsFollower: string = gql`
	query getIsFollower($user: ID!) {
		getIsFollower(user: $user) {
			isFollower
			errorMessage
		}
	}
`
