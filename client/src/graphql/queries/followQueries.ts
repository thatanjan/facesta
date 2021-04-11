import { gql } from 'graphql-request'

export const getFollowers: string = gql`
	query getFollowers($user: ID!, $skip: Int!) {
		getFollowers(Input: { user: $user, skip: $skip }) {
			followers {
				_id

				profile {
					name
					profilePicture
				}
			}
			errorMessage
		}
	}
`

export const getFollowees: string = gql`
	query getFollowees($user: ID!, $skip: Int!) {
		getFollowees(Input: { user: $user, skip: $skip }) {
			followees {
				_id
				profile {
					name
					profilePicture
				}
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

export const getRecommendedToFollow = gql`
	query getRecommendedToFollow {
		getRecommendedToFollow {
			users {
				_id
				profile {
					name
					profilePicture
				}
			}
		}
	}
`
