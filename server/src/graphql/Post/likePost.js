import createPostModel from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'

const LIKE = 'like'
const REMOVE_LIKE = 'removeLike'
const LIKES = 'likes'

// eslint-disable-next-line
const queryPostLikes = async (model, id) =>
	await model.findById(id, `${LIKES} totalLikes`)

const hasLiked = async ({ postID, postOwnerID, myID }) => {
	const PostModel = createPostModel(postOwnerID.toString())

	return PostModel.findOne({ _id: postID, likes: { $in: myID } }, 'likes')
}

const modifyLikes = ({ operation, likesQuery, id }) => {
	const { likes } = likesQuery

	switch (operation) {
		case LIKE:
			likes.push(id)

			// eslint-disable-next-line
			likesQuery.totalLikes++

			break

		case REMOVE_LIKE:
			likes.pull(id)

			// eslint-disable-next-line
			likesQuery.totalLikes--
			break

		default:
			return false
	}

	return false
}

const responseMessage = operation => {
	switch (operation) {
		case LIKE:
			return sendErrorMessage('you have liked this post')

		case REMOVE_LIKE:
			return sendErrorMessage('you have removed like from the post')

		default:
			return false
	}
}

const mainFunction = operation => {
	return async (_, { Input: { postID, user } }, { user: { id } }) => {
		const Post = createPostModel(user)

		const { likes } = likesQuery

		if (
			operation === LIKE &&
			(await hasLiked({ postID, postOwnerID: user, myID: id }))
		) {
			return sendErrorMessage('you have already liked this post')
		}

		if (
			operation === REMOVE_LIKE &&
			!(await hasLiked({ postID, postOwnerID: user, myID: id }))
		) {
			return sendErrorMessage('you have not liked this post.')
		}

		modifyLikes({ operation, id, likesQuery })

		likesQuery.save()

		return responseMessage(operation)
	}
}

const resolver = {
	Mutation: {
		likePost: mainFunction(LIKE),
		removeLikePost: mainFunction(REMOVE_LIKE),
	},
	Query: {
		hasLiked: async (_, { Input: { postID, user } }, { user: { id } }) => {
			const doesUserExist = await hasLiked({
				postID,
				postOwnerID: user,
				myID: id,
			})
			if (doesUserExist) return true

			return false
		},
	},
}

export default resolver
