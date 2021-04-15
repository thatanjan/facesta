import createPostModel from 'models/Post'
import sendMessage from 'utils/message'
import sendErrorMessage from 'utils/errorMessage'

const LIKE = 'like'
const REMOVE_LIKE = 'removeLike'

const hasLiked = async ({ postID, postOwnerID, myID }) => {
	const PostModel = createPostModel(postOwnerID.toString())

	return PostModel.findOne({ _id: postID, likes: { $in: myID } }, 'likes')
}

const resolver = {
	Mutation: {
		likePost: async (_, { Input: { postID, user } }, { user: { id } }) => {
			try {
				const PostModel = createPostModel(user.toString())
				const res = await PostModel.updateOne(
					{ _id: postID },
					{ $push: { likes: id }, $inc: { totalLikes: 1 } }
				)

				if (res || res.nModified > 0) return sendMessage('you have liked this post')

				return sendErrorMessage('something went wrong')
			} catch (__) {
				return sendErrorMessage('something went wrong')
			}
		},
		removeLikePost: async (_, { Input: { postID, user } }, { user: { id } }) => {
			try {
				const PostModel = createPostModel(user.toString())

				const res = await PostModel.updateOne(
					{ _id: postID },
					{ $pull: { likes: id }, $inc: { totalLikes: -1 } }
				)

				if (res || res.nModified > 0)
					return sendMessage('you have removed like from the post')
			} catch (___) {
				return sendErrorMessage('something went wrong')
			}
		},
	},
	Query: {
		hasLiked: async (_, { Input: { postID, user } }, { user: { id } }) => {
			try {
				const doesUserExist = await hasLiked({
					postID,
					postOwnerID: user,
					myID: id,
				})

				if (doesUserExist) return true

				return false
			} catch (err) {
				return sendErrorMessage(err)
			}
		},
	},
}

export default resolver
