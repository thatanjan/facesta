import createPostModel from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'

const resolvers = {
	Query: {
		getTotalLikes: async (_, { Input: { postID, user } }) => {
			const PostModel = createPostModel(user)

			const post = await PostModel.findById(postID, 'totalLikes')

			if (!post) {
				return sendErrorMessage('no post found')
			}

			const { totalLikes } = post

			return { totalLikes }
		},
	},
}

export default resolvers
