import NewsFeedModel from 'models/NewsFeed'
import createPostModel from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'
import { postProjection as projection } from 'variables/global'
import skippingList from 'utils/skippingList'

const resolvers = {
	Query: {
		getNewsFeedPost: async (_, { skip }, { user: { id } }) => {
			try {
				const { totalPosts } = await NewsFeedModel.findOne(
					{
						user: id,
					},
					'totalPosts'
				)

				const { newSkip, returnNumber, empty } = skippingList(skip, totalPosts)

				if (empty) return { posts: [] }

				const NewsFeedPosts = await NewsFeedModel.findOne({
					user: id,
				})
					.slice('posts', [-Math.abs(newSkip || skip), returnNumber || 10])
					.populate({
						path: 'posts',
						populate: {
							path: 'user',
							select: 'name',
							populate: {
								path: 'profile',
								select: 'profilePicture',
							},
						},
					})

				const { posts } = NewsFeedPosts
				posts.reverse()

				const allPosts = posts.map(({ post: postId, user: { _id: userID } }) => {
					const PostModel = createPostModel(userID.toString())
					return PostModel.findById(postId, projection)
				})

				const postsWithContent = await Promise.all(allPosts)

				const responseObject = { posts: [] }
				posts.forEach((__, index) => {
					const newObject = {
						...postsWithContent[index].toObject(),
						user: posts[index].user.toObject(),
					}

					responseObject.posts.push(newObject)
				})

				return responseObject
			} catch (err) {
				return sendErrorMessage(err)
			}
		},
	},
}

export default resolvers
