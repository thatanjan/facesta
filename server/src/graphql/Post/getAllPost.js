import Post from 'models/Post'
import { getPostProjection, populateObjectOfUser } from 'variables/global'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Query: {
		getAllPost: async (_, { Input: { user, skip } }, { user: { id } }) => {
			try {
				let posts = await Post.find({ user }, getPostProjection(id))
					.sort('-date')
					.skip(skip)
					.limit(10)
					.populate(populateObjectOfUser)

				posts = posts.map(item => {
					const post = item.toObject()
					post.hasLiked = false

					if (post.likes.length) {
						post.hasLiked = true
					}

					return post
				})

				return { posts }
			} catch (e) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
