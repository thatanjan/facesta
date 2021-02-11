import createPostModel from 'models/Post'
import ifNullOrFalse from 'utils/checkNullFalse'
import sendMessage from 'utils/error'

const SUCCESS = 'success'
const SINGLE_POST = 'singlePost'
const ALL_POST = 'allPost'

const mainResolver = field => {
	return async (_, { Input: { postId, postUserId, start } }) => {
		const Post = createPostModel(postUserId)

		switch (field) {
			case SINGLE_POST:
				const singlePost = await Post.findById(postId, 'text')

				if (ifNullOrFalse(singlePost)) {
					return sendMessage(false, null, 'no post found')
				}

				return singlePost

			case ALL_POST:
				const allPost = {}

				allPost.posts = await Post.find({}).sort({ _id: '-1' }).skip(start).limit(3)

				if (allPost.posts === []) {
					return sendMessage(false, null, 'you have no post')
				}

				return allPost

			default:
				return sendMessage(false, null, 'nothing found')
		}
	}
}

const resolver = {
	returnSinglePost: {
		__resolveType(obj) {
			if (SUCCESS in obj) return 'Success'

			if (obj.text) return 'Post'

			return null
		},
	},
	returnAllPost: {
		__resolveType(obj) {
			if (SUCCESS in obj) return 'Success'

			if (obj.posts) return 'AllPost'

			return null
		},
	},
	Query: {
		getAllPost: mainResolver(ALL_POST),
		getSinglePost: mainResolver(SINGLE_POST),
	},
}

export default resolver
