import { and, rule, shield } from 'graphql-shield'

import { USER_DOES_NOT_EXIST, POST_DOES_NOT_EXIST } from 'variables/errors'
import User from 'models/User'
import createPostModel from 'models/Post'

const isAuthenticated = rule()(async (_, __, { user, error }) => {
	if (error) {
		return new Error(error)
	}

	if (!user) {
		return false
	}

	return true
})

const doesUserExist = rule()(async (_, __, { user }) => {
	const userExist = await User.findById(user.id, 'name')

	if (!userExist) return new Error(USER_DOES_NOT_EXIST)

	return true
})

const doesPostExist = rule()(async (_, { Input: { postID, user } }) => {
	const postModel = createPostModel(user)

	const post = await postModel.findById(postID)

	if (!post) return new Error(POST_DOES_NOT_EXIST)

	return true
})

export default shield(
	{
		Mutation: {
			createPost: and(isAuthenticated, doesUserExist),
			deletePost: and(isAuthenticated, doesUserExist),
			likePost: and(isAuthenticated, doesUserExist, doesPostExist),
			removeLikePost: and(isAuthenticated, doesUserExist, doesPostExist),
			commentPost: and(isAuthenticated, doesUserExist, doesPostExist),
			removeCommentPost: and(isAuthenticated, doesUserExist, doesPostExist),
			editPost: and(isAuthenticated, doesUserExist, doesPostExist),
			updatePersonalData: and(isAuthenticated, doesUserExist),
			uploadProfilePicture: and(isAuthenticated, doesUserExist),
			removeProfilePicture: and(isAuthenticated, doesUserExist),
			followUser: and(isAuthenticated, doesUserExist),
			unfollowUser: and(isAuthenticated, doesUserExist),
		},
		Query: {
			getSinglePost: and(isAuthenticated, doesUserExist, doesPostExist),
			getAllPost: and(isAuthenticated, doesUserExist),
			getNewsFeedPost: and(isAuthenticated, doesUserExist),
			getTotalLikes: and(isAuthenticated, doesUserExist, doesPostExist),
			getTotalComments: and(isAuthenticated, doesUserExist, doesPostExist),
			getAllComments: and(isAuthenticated, doesUserExist, doesPostExist),
			getAllLikes: and(isAuthenticated, doesUserExist, doesPostExist),
			hasLiked: and(isAuthenticated, doesUserExist, doesPostExist),
			getUser: and(isAuthenticated, doesUserExist),
			getPersonalData: and(isAuthenticated, doesUserExist),
			getProfilePicture: and(isAuthenticated, doesUserExist),
			getFollowers: and(isAuthenticated, doesUserExist),
			getFollowees: and(isAuthenticated, doesUserExist),
			getIsFollowee: and(isAuthenticated, doesUserExist),
			getIsFollower: and(isAuthenticated, doesUserExist),
			getRecommendedToFollow: and(isAuthenticated, doesUserExist),
		},
	},
	{
		allowExternalErrors: true,
	}
)
