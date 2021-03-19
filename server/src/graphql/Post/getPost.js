import createPostModel from 'models/Post'
import ifNullOrFalse from 'utils/checkNullFalse'
import sendErrorMessage from 'utils/errorMessage'

const SINGLE_POST = 'singlePost'
const ALL_POST = 'allPost'

const mainResolver = field => {
	return async (_, { Input: { postID, user, start } }) => {
		try {
			const Post = createPostModel(user)

			switch (field) {
				case SINGLE_POST:
					const post = await Post.findById(postID)

					if (ifNullOrFalse(post)) {
						return sendErrorMessage('no post found')
					}

					return { post }

				case ALL_POST:
					const allPost = {}

					let { posts } = allPost

					posts = await Post.find({}).sort({ _id: '-1' }).skip(start).limit(3)

					if (posts.length <= 0) {
						return sendErrorMessage('you have no post')
					}

					allPost.posts = posts

					return allPost

				default:
					return sendErrorMessage('nothing found')
			}
		} catch (error) {
			return sendErrorMessage(error)
		}
	}
}

const resolver = {
	Query: {
		getAllPost: mainResolver(ALL_POST),
		getSinglePost: mainResolver(SINGLE_POST),
	},
}

export default resolver
