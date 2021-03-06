import { gql } from 'graphql-request'
import { ERROR_MESSAGE } from 'variables/global'

export const getFollowers: string = gql`
	query getFollowers($userID: ID) {
		getFollowers(userID: $userID) {
			followers {
				name
				_id
			}
			${ERROR_MESSAGE}	
		}
	}
`

export const getFollowee: string = gql`
	query getFollowees($userID: ID) {
		getFollowees(userID: $userID) {
			followees {
				name
				_id
			}
			${ERROR_MESSAGE}	
		}
	}
`

export const getIsFollowee: string = gql`
	query getIsFollowee($userID: ID!) {
		getIsFollowee(userID: $userID) {
			isFollowee
			${ERROR_MESSAGE}	
		}
	}
`

export const getIsFollower: string = gql`
	query getIsFollower($userID: ID!) {
		getIsFollower(userID: $userID) {
			isFollower
			${ERROR_MESSAGE}	
		}
	}
`
