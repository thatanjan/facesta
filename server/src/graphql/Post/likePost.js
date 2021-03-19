import createPostModel from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'

const LIKE = 'like'
const REMOVE_LIKE = 'removeLike'

const hasLiked = async ({ postID, postOwnerID, myID }) => {
	const PostModel = createPostModel(postOwnerID.toString())

	return PostModel.findOne({ _id: postID, likes: { $in: myID } }, 'likes')
}

const modifyLikes = async ({ postID, postOwnerID, myID }, operation) => {
	const PostModel = createPostModel(postOwnerID.toString())

	switch (operation) {
		case LIKE:
			const res = await PostModel.updateOne(
				{ _id: postID },
				{ $push: { likes: myID }, $inc: { totalLikes: 1 } }
			)

			if (res || res.nModified < 0) return true

			return false

		case REMOVE_LIKE:
			const res2 = await PostModel.updateOne(
				{ _id: postID },
				{ $pull: { likes: myID }, $inc: { totalLikes: -1 } }
			)

			if (res2 || res2.nModified < 0) return true
			return false

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
		try {
			const params = { postID, postOwnerID: user, myID: id }

			if (operation === LIKE && (await hasLiked(params))) {
				return sendErrorMessage('you have already liked this post')
			}

			if (operation === REMOVE_LIKE && !(await hasLiked(params))) {
				return sendErrorMessage('you have not liked this post.')
			}

			const hasModified = await modifyLikes(params, operation)

			if (!hasModified) return sendErrorMessage('something went wrong')

			return responseMessage(operation)
		} catch (err) {
			return sendErrorMessage(err)
		}
	}
}

const resolver = {
	Mutation: {
		likePost: mainFunction(LIKE),
		removeLikePost: mainFunction(REMOVE_LIKE),
	},
	Query: {
		hasLiked: async (_, { Input: { postID, user } }, { user: { id } }) => {
			try {
				const doesUserExist = await hasLiked({
					postID,
					postOwnerID: user,
					myID: id,
				})

				if (!doesUserExist) return true

				return false
			} catch (err) {
				return sendErrorMessage(err)
			}
		},
	},
}

export default resolver
