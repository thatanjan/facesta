import createPostModel from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'

const resolvers = {
	Query: {
		getAllComments: async (_, { Input: { start, postID, user } }) => {
			try {
				const PostModel = createPostModel(user)

				const post = await PostModel.findById(postID).slice('comments', [
					start,
					start + 10,
				])

				const comments = post.comments

				return { comments }
			} catch (err) {
				return sendErrorMessage(err)
			}
		},
	},
}

export default resolvers
