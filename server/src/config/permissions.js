import User from 'models/User'
import { rule, shield } from 'graphql-shield'

const isAuthenticated = rule()(async (_, __, { user, error }) => {
	if (!user) {
		return false
	}

	const doesUserExist = await User.findById(user.id, 'name')

	if (!doesUserExist) return false

	if (error) {
		return new Error(error)
	}

	return true
})

export default shield(
	{
		Mutation: {
			createPost: isAuthenticated,
			deletePost: isAuthenticated,
			updatePersonalData: isAuthenticated,
			followUser: isAuthenticated,
			unfollowUser: isAuthenticated,
			likePost: isAuthenticated,
			removeLikePost: isAuthenticated,
			commentPost: isAuthenticated,
			removeCommentPost: isAuthenticated,
		},
		Query: {
			getSinglePost: isAuthenticated,
			getAllPost: isAuthenticated,
			getPersonalData: isAuthenticated,
			getFollowers: isAuthenticated,
			getFollowees: isAuthenticated,
			getIsFollowee: isAuthenticated,
			getIsFollower: isAuthenticated,
		},
	},
	{
		allowExternalErrors: true,
	}
)
