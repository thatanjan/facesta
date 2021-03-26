import User from 'models/User'
import createPostModel from 'models/Post'
import ifNullOrFalse from 'utils/checkNullFalse'
import sendErrorMessage from 'utils/errorMessage'
import { postProjection as projection } from 'variables/global'

const SINGLE_POST = 'singlePost'
const ALL_POST = 'allPost'

const mainResolver = field => {
	return async (_, { Input: { postID, user, start } }) => {
		try {
			const Post = createPostModel(user)

			switch (field) {
				case SINGLE_POST:
					const post = await Post.findById(postID, projection)

					if (ifNullOrFalse(post)) {
						return sendErrorMessage('no post found')
					}

					const userInfo = await User.findById(user, 'name profile').populate({
						path: 'profile',
						select: 'profilePicture',
					})

					const {
						text,
						markdown,
						image,
						_id,
						headline,
						totalComments,
						totalLikes,
					} = post

					const response = {
						post: {
							text,
							markdown,
							_id,
							headline,
							image,
							totalComments,
							totalLikes,
							user: userInfo,
						},
					}

					return response

				case ALL_POST:
					const allPost = {}

					let posts

					posts = await Post.find({}, projection)
						.sort({ _id: '-1' })
						.skip(start)
						.limit(3)

					if (!posts && posts.length <= 0) {
						return sendErrorMessage('you have no post')
					}

					posts.reverse()

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
