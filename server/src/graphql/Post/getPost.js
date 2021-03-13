import createPostModel from 'models/Post'
import ifNullOrFalse from 'utils/checkNullFalse'
import sendErrorMessage from 'utils/errorMessage'
import NewsFeedModel from 'models/NewsFeed'

const SINGLE_POST = 'singlePost'
const ALL_POST = 'allPost'
const ALL_NEWS_FEED_POST = 'allNewsFeedPost'

const mainResolver = field => {
	return async (
		_,
		{ Input: { postID, userID, postOwnerID, start } },
		{ user: { id } }
	) => {
		try {
			const Post = createPostModel(userID || postOwnerID || id)

			switch (field) {
				case SINGLE_POST:
					const singlePost = await Post.findById(postID)

					if (ifNullOrFalse(singlePost)) {
						return sendErrorMessage('no post found')
					}

					singlePost.postID = singlePost._id

					singlePost.image = singlePost.imageURL

					return singlePost

				case ALL_POST:
					const allPost = {}

					let { posts } = allPost

					posts = await Post.find({}).sort({ _id: '-1' }).skip(start).limit(3)

					if (posts.length <= 0) {
						return sendErrorMessage('you have no post')
					}

					posts.forEach(item => {
						// eslint-disable-next-line
						item.postID = item._id
					})

					allPost.posts = posts

					return allPost

				// case ALL_NEWS_FEED_POST:
				//	 const allNewsFeedPost = await NewsFeedModel.findOne(
				//		 { user: ownerID },
				//		 'posts'
				//	 )

				//	 break

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
		getNewsFeedPost: mainResolver(ALL_NEWS_FEED_POST),
	},
}

export default resolver
