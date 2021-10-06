import Post from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'
import skippingList from 'utils/skippingList'

const resolvers = {
	Query: {
		getAllComments: async (_, { Input: { skip, postID } }) => {
			try {
				const { totalComments } = await Post.findById(postID, 'totalComments')

				const { newSkip, returnNumber, empty } = skippingList(skip, totalComments)

				if (empty) return { comments: [] }

				const post = await Post.findById(postID)
					.slice('comments', [newSkip, returnNumber])
					.populate({
						path: 'comments',
						populate: {
							path: 'user',
							select: '_id ',
							populate: {
								path: 'profile',
								select: 'name profilePicture',
							},
						},
					})

				return { comments: post.comments.reverse() }
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
		getAllLikes: async (_, { Input: { skip, postID } }) => {
			try {
				const { totalLikes } = await Post.findById(postID, 'totalLikes')

				const { newSkip, returnNumber, empty } = skippingList(skip, totalLikes)

				if (empty) return { users: [] }

				const post = await Post.findById(postID, {
					likes: { $slice: [newSkip, returnNumber] },
				}).populate({
					path: 'likes',
					select: '_id',
					populate: {
						path: 'profile',
						select: 'name profilePicture',
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
