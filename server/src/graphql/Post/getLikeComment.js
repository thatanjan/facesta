import createPostModel from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'
import skippingList from 'utils/skippingList'

const resolvers = {
	Query: {
		getAllComments: async (_, { Input: { skip, postID, user } }) => {
			try {
				const PostModel = createPostModel(user)

				const { totalComments } = await PostModel.findById(postID, 'totalComments')

				const { newSkip, returnNumber, empty } = skippingList(skip, totalComments)

				if (empty) return { posts: [] }

				const post = await PostModel.findById(postID)
					.slice('comments', [-Math.abs(newSkip || skip), returnNumber || 10])
					.slice('likes', 0)
					.populate({
						path: 'comments',
						populate: {
							path: 'user',
							select: 'name _id ',
							populate: {
								path: 'profile',
								select: 'profilePicture',
							},
						},
					})

				return { comments: post.comments.reverse() }
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
