import { and, rule, shield } from 'graphql-shield'

import { USER_DOES_NOT_EXIST, POST_DOES_NOT_EXIST } from 'variables/errors'
import User from 'models/User'
import Post from 'models/Post'

const LIKE_POST = 'like'
const REMOVE_LIKE = 'removeLike'

const somethingWentWrong = () => new Error('something went wrong')

const areSameID = rule()(async (_, { user }, { user: { id } }) => {
	if (user === id) return false

	return true
})

const isAuthenticated = rule()(async (_, __, { user, error }) => {
	if (error) {
		return new Error(error)
	}

	if (!user) {
		return false
	}

	return true
})

const doesOwnThePost = rule()(async (_, { postID }, { user: { id } }) => {
	try {
		const post = await Post.findById(postID, 'user')

		if (!post) return new Error(POST_DOES_NOT_EXIST)

		if (post.user.toString() !== id) return new Error("You don't own the post")

		return true
	} catch (__) {
		return somethingWentWrong()
	}
})

const doesUserExist = rule()(async (_, __, { user }) => {
	try {
		const userExist = await User.findById(user.id, 'email')

		if (!userExist) return new Error(USER_DOES_NOT_EXIST)

		return true
	} catch (___) {
		return somethingWentWrong()
	}
})

const doesOtherUserExist = rule()(async (_, { user }) => {
	try {
		const userExist = await User.findById(user, 'email')

		if (!userExist) return new Error(`other ${USER_DOES_NOT_EXIST}`)

		return true
	} catch (__) {
		return somethingWentWrong()
	}
})

const doesPostExist = rule()(async (_, { Input: { postID } }) => {
	try {
		const post = await Post.findById(postID, '_id')

		if (!post) return new Error(POST_DOES_NOT_EXIST)

		return true
	} catch (__) {
		return somethingWentWrong()
	}
})

const doesPostAndLikeExist = operation =>
	rule()(async (_, { Input: { postID } }, { user: { id } }) => {
		try {
			const post = await Post.findOne(
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
		} catch (__) {
			return somethingWentWrong()
		}
	})

export default shield(
	{
		Mutation: {
			createPost: and(isAuthenticated, doesUserExist),
			deletePost: and(isAuthenticated, doesUserExist, doesOwnThePost),
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
			commentPost: and(isAuthenticated, doesUserExist),
			removeCommentPost: and(isAuthenticated, doesUserExist, doesPostExist),
			editPost: and(isAuthenticated, doesUserExist, doesOwnThePost),
			updatePersonalData: and(isAuthenticated, doesUserExist),
			uploadProfilePicture: and(isAuthenticated, doesUserExist),
			removeProfilePicture: and(isAuthenticated, doesUserExist),
			followUser: and(
				isAuthenticated,
				doesUserExist,
				areSameID,
				doesOtherUserExist
			),
			unfollowUser: and(
				isAuthenticated,
				doesUserExist,
				areSameID,
				doesOtherUserExist
			),
		},
		Query: {
			getNewsFeedPost: and(isAuthenticated, doesUserExist),
			hasLiked: and(isAuthenticated, doesUserExist, doesPostExist),
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
