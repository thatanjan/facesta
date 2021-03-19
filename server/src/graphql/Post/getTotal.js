import createPostModel from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'

const TOTAL_LIKES = 'totalLikes'
const TOTAL_COMMENTS = 'totalComments'

const mainResolver = field => async (_, { Input: { postID, user } }) => {
	try {
		const PostModel = createPostModel(user)

		const post = await PostModel.findById(postID, field)

		if (!post) {
			return sendErrorMessage('no post found')
		}

		const response = {}

		response[field] = post[field]

		return response
	} catch (err) {
		return sendErrorMessage(err)
	}
}

const resolvers = {
	Query: {
		getTotalLikes: mainResolver(TOTAL_LIKES),
		getTotalComments: mainResolver(TOTAL_COMMENTS),
	},
}

export default resolvers
