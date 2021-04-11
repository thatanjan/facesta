import { and, rule, shield } from 'graphql-shield'

import { USER_DOES_NOT_EXIST } from 'variables/errors'
import User from 'models/User'

const isAuthenticated = rule()(async (_, __, { user, error }) => {
	if (!user) {
		return false
	}

	if (error) {
		return new Error(error)
	}

	return true
})

const doesUserExist = rule()(async (_, __, { user }) => {
	const userExist = await User.findById(user.id, 'name')

	if (!userExist) return new Error(USER_DOES_NOT_EXIST)

	return true
})

export default shield(
	{
		Mutation: {
			createPost: and(isAuthenticated, doesUserExist),
			deletePost: and(isAuthenticated, doesUserExist),
			updatePersonalData: and(isAuthenticated, doesUserExist),
			followUser: and(isAuthenticated, doesUserExist),
			unfollowUser: and(isAuthenticated, doesUserExist),
			likePost: and(isAuthenticated, doesUserExist),
			removeLikePost: and(isAuthenticated, doesUserExist),
			commentPost: and(isAuthenticated, doesUserExist),
			removeCommentPost: and(isAuthenticated, doesUserExist),
		},
		Query: {
			getSinglePost: and(isAuthenticated, doesUserExist),
			getAllPost: and(isAuthenticated, doesUserExist),
			getPersonalData: and(isAuthenticated, doesUserExist),
			getFollowers: and(isAuthenticated, doesUserExist),
			getFollowees: and(isAuthenticated, doesUserExist),
			getIsFollowee: and(isAuthenticated, doesUserExist),
			getIsFollower: and(isAuthenticated, doesUserExist),
		},
	},
	{
		allowExternalErrors: true,
	}
)
