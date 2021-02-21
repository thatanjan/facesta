import { rule, shield } from 'graphql-shield'

const isAuthenticated = rule()((_, __, { user, error }) => {
	if (user) {
		return true
	}

	if (error) {
		return new Error(error)
	}
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
