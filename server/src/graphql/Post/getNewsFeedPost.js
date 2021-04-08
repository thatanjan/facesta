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

				console.table([newSkip, returnNumber])

				if (empty) return { posts: [] }

				const newsFeedPosts = await NewsFeedModel.findOne({
					user: id,
				})
					.slice('posts', [-Math.abs(newSkip), returnNumber])
					.populate({
						path: 'posts',
						populate: {
							path: 'user',
							populate: {
								path: 'profile',
								select: 'profilePicture name',
							},
						},
					})

				const { posts } = newsFeedPosts
				posts.reverse()

				const allPosts = posts.map(({ post: postId, user: { _id: userID } }) => {
					const PostModel = createPostModel(userID.toString())
					return PostModel.findById(postId, {
						likes: { $elemMatch: { $eq: id } },
						...projection,
					})
				})

				const postsWithContent = await Promise.all(allPosts)

				const responseObject = { posts: [] }

				posts.forEach((__, index) => {
					const newObject = {
						...postsWithContent[index].toObject(),
						hasLiked: postsWithContent[index].likes.length === 1,
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
