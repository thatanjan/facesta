import { and, rule, shield } from 'graphql-shield'

import { USER_DOES_NOT_EXIST, POST_DOES_NOT_EXIST } from 'variables/errors'
import User from 'models/User'
import createPostModel from 'models/Post'

const LIKE_POST = 'like'
const REMOVE_LIKE = 'removeLike'

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
	const userExist = await User.findById(user.id, 'email')

	if (!userExist) return new Error(USER_DOES_NOT_EXIST)

	return true
})

const doesOtherUserExist = rule()(async (_, { user }) => {
	const userExist = await User.findById(user, 'email')

	if (!userExist) return new Error(`other ${USER_DOES_NOT_EXIST}`)

	return true
})

const doesPostExist = rule()(async (_, { Input: { postID, user } }) => {
	const postModel = createPostModel(user)

	const post = await postModel.findById(postID)

	if (!post) return new Error(POST_DOES_NOT_EXIST)

	return true
})

const doesPostAndLikeExist = operation => {
	return rule()(async (_, { Input: { postID, user } }, { user: { id } }) => {
		const PostModel = createPostModel(user.toString())
		const post = await PostModel.findOne(
			{ _id: postID },
			{ likes: { $elemMatch: { $eq: id } } }
		)

		if (!post) return new Error(POST_DOES_NOT_EXIST)

		switch (operation) {
			case LIKE_POST:
				if (post.likes.length !== 0)
					return new Error('You have already liked this post')

				break

			case REMOVE_LIKE:
				if (post.likes.length === 0)
					return new Error('You have not liked this post')

				break
			default:
				return false
		}

		return true
	})
}

export default shield(
	{
		Mutation: {
			createPost: and(isAuthenticated, doesUserExist),
			deletePost: and(isAuthenticated, doesUserExist),
			likePost: and(
				isAuthenticated,
				doesUserExist,
				doesPostAndLikeExist(LIKE_POST)
			),
			removeLikePost: and(
				isAuthenticated,
				doesUserExist,
				doesPostAndLikeExist(REMOVE_LIKE)
			),
			commentPost: and(isAuthenticated, doesUserExist, doesPostExist),
			removeCommentPost: and(isAuthenticated, doesUserExist, doesPostExist),
			editPost: and(isAuthenticated, doesUserExist, doesPostExist),
			updatePersonalData: and(isAuthenticated, doesUserExist),
			uploadProfilePicture: and(isAuthenticated, doesUserExist),
			removeProfilePicture: and(isAuthenticated, doesUserExist),
			followUser: and(isAuthenticated, doesUserExist, doesOtherUserExist),
			unfollowUser: and(isAuthenticated, doesUserExist, doesOtherUserExist),
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
			searchUser: and(isAuthenticated, doesUserExist),
		},
	},
	{
		allowExternalErrors: true,
	}
)
