import createPostModel from 'models/Post'
import ifNullOrFalse from 'utils/checkNullFalse'
import sendMessage from 'utils/errorMessage'
import NewsFeedModel from 'models/NewsFeed'

const SUCCESS = 'success'
const SINGLE_POST = 'singlePost'
const ALL_POST = 'allPost'
const ALL_NEWS_FEED_POST = 'allNewsFeedPost'

const mainResolver = field => {
	return async (_, { Input: { postId, postUserId, start, ownUserId } }) => {
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

				if (allPost.posts.length <= 0) {
					return sendMessage(false, null, 'you have no post')
				}

				return allPost

			case ALL_NEWS_FEED_POST:
				const allNewsFeedPost = await NewsFeedModel.findOne(
					{ user: ownUserId },
					'posts'
				)
				console.log(allNewsFeedPost)

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
		getNewsFeedPost: mainResolver(ALL_NEWS_FEED_POST),
	},
}

export default resolver
