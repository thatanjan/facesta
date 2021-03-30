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

				if (empty) return { comments: [] }

				const post = await PostModel.findById(postID)
					.slice('comments', [-Math.abs(newSkip), returnNumber])
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
		getAllLikes: async (_, { Input: { skip, postID, user } }) => {
			try {
				const PostModel = createPostModel(user)

				const { totalLikes } = await PostModel.findById(postID, 'totalLikes')

				const { newSkip, returnNumber, empty } = skippingList(skip, totalLikes)

				if (empty) return { likes: [] }

				const post = await PostModel.findById(postID, {
					likes: { $slice: [-Math.abs(newSkip), returnNumber] },
					comments: { $slice: 0 },
				}).populate({
					path: 'likes',
					select: 'name _id',
					populate: {
						path: 'profile',
						select: 'profilePicture',
					},
				})

				return { users: post.likes.reverse() }
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
	},
}

export default resolvers
