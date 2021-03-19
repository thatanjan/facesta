import createPostModel from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'

const resolvers = {
	Query: {
		getAllComments: async (_, { Input: { start, postID, user } }) => {
			try {
				const PostModel = createPostModel(user)

				const post = await PostModel.findById(postID, {
					comments: { $slice: [start, start + 10] },
					likes: { $slice: 0 },
				}).populate({
					path: 'comments',
					populate: { path: 'user', select: 'name _id' },
				})

				return { comments: post.comments }
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
		getAllLikes: async (_, { Input: { start, postID, user } }) => {
			try {
				const PostModel = createPostModel(user)

				const post = await PostModel.findById(postID, {
					likes: { $slice: [start, start + 10] },
					comments: { $slice: 0 },
				}).populate('likes', 'name _id')

				return { users: post.likes }
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
	},
}

export default resolvers
