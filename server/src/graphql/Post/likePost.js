import Post from 'models/Post'
import sendMessage from 'utils/message'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Mutation: {
		likePost: async (_, { Input: { postID } }, { user: { id } }) => {
			try {
				const res = await Post.updateOne(
					{ _id: postID },
					{ $push: { likes: id }, $inc: { totalLikes: 1 } }
				)

				if (res && res.nModified > 0) return sendMessage('you have liked this post')

				return sendErrorMessage('something went wrong')
			} catch (__) {
				return sendErrorMessage('something went wrong')
			}
		},
		removeLikePost: async (_, { Input: { postID } }, { user: { id } }) => {
			try {
				const res = await Post.updateOne(
					{ _id: postID },
					{ $pull: { likes: id }, $inc: { totalLikes: -1 } }
				)

				if (res && res.nModified > 0)
					return sendMessage('you have removed like from the post')

				return sendErrorMessage('something went wrong')
			} catch (___) {
				return sendErrorMessage('something went wrong')
			}
		},
	},
}

export default resolver
