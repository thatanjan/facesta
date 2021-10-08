import Post from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'
import { populateObjectOfUser, getPostProjection } from 'variables/global'

const resolver = {
	Query: {
		getSinglePost: async (_, { Input: { postID } }, { user }) => {
			try {
				const authUserID = user.id || ''

				let post = await Post.findById(
					postID,
					getPostProjection(authUserID)
				).populate(populateObjectOfUser)

				post = post.toObject()

				if (post.likes.length) {
					post.hasLiked = true
				} else {
					post.hasLiked = false
				}

				return { post }
			} catch (e) {
				return sendErrorMessage(e)
			}
		},
	},
}

export default resolver
