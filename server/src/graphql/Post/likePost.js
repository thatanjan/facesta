import createPostModel from 'models/Post'
import sendMessage from 'utils/errorMessage'

const LIKE = 'like'
const REMOVE_LIKE = 'removeLike'
const LIKES = 'likes'

const queryPostLikes = async (model, id) => await model.findById(id, LIKES)

const hasLiked = (array, id) => array.includes(id)

const modifyLikes = ({ operation, likes, id }) => {
	switch (operation) {
		case LIKE:
			likes.push(id)

			break

		case REMOVE_LIKE:
			likes.pull(id)

		default:
			return false
	}
}

const responseMessage = operation => {
	switch (operation) {
		case LIKE:
			return sendMessage(true, 'you have liked this post')

		case REMOVE_LIKE:
			return sendMessage(true, 'you have remove like from the post')

		default:
			return false
	}
}

const mainFunction = operation => {
	return async (_, { Input: { postId, postUserId } }, { user: { id } }) => {
		const Post = createPostModel(postUserId)

		const likesQuery = await queryPostLikes(Post, postId)

		const { likes } = likesQuery

		if (operation === LIKE && hasLiked(likes, id)) {
			return sendMessage(false, 'you have already liked this post')
		}

		if (operation === REMOVE_LIKE && !hasLiked(likes, id)) {
			return sendMessage(false, 'you have not liked this post.')
		}

		modifyLikes({ operation, likes, id })

		likesQuery.save()

		return responseMessage(operation)
	}
}

const resolver = {
	Mutation: {
		likePost: mainFunction(LIKE),
		removeLikePost: mainFunction(REMOVE_LIKE),
	},
}

export default resolver
