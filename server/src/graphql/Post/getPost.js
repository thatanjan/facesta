import createPostModel from 'models/Post'
import ifNullOrFalse from 'utils/checkNullFalse'
import sendMessage from 'utils/error'

const SUCCESS = 'success'
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
		getSinglePost: async (_, { Input: { postId, userId } }, { user: { id } }) => {
			const Post = createPostModel(userId || id)

			const singlePost = await Post.findById(postId, 'text')

			if (ifNullOrFalse(singlePost)) {
				return sendMessage(false, null, 'no post found')
			}

			return singlePost
		},
		getAllPost: async (_, { Input: { start } }, { user: { id } }) => {
			const Post = createPostModel(id)

			const allPost = {}

			allPost.posts = await Post.find({}).sort({ _id: '-1' }).skip(start).limit(3)

			if (allPost.posts === []) {
				return sendMessage(false, null, 'you have no post')
			}

			return allPost
		},
	},
}

export default resolver
