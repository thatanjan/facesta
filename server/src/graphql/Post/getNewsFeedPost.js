import NewsFeedModel from 'models/NewsFeed'
import createPostModel from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'
import { postProjection as projection } from 'variables/global'
import skippingList from 'utils/skippingList'

const resolvers = {
	Query: {
		getNewsFeedPost: async (_, { skip }, { user: { id } }) => {
			console.log('id:', id)
			console.log('skip:', skip)
			try {
				const { totalPosts } = await NewsFeedModel.findOne(
					{
						user: id,
					},
					'totalPosts'
				)

				console.log('totalPosts', totalPosts)

				const { newSkip, returnNumber, empty } = skippingList(skip, totalPosts)

				if (empty) return { posts: [] }

				console.log('returnNumber:', returnNumber)

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

				console.log('newsFeedPosts', newsFeedPosts)

				const { posts } = newsFeedPosts
				posts.reverse()

				const postsWithContent = async () => {
					const allPosts = posts.map(({ post: postId, user: { _id: userID } }) => {
						const PostModel = createPostModel(userID.toString())
						console.log(PostModel)
						return PostModel.findById(postId, {
							likes: { $elemMatch: { $eq: id } },
							...projection,
						})
					})

					const resolvedPosts = await Promise.all(allPosts)

					return resolvedPosts
				}

				console.log(
					'postsWithContent:  ',
					JSON.stringify(postsWithContent, null, 2)
				)

				const responseObject = { posts: [] }

				posts.forEach((__, index) => {
					if (postsWithContent[index]) {
						const newObject = {
							...postsWithContent[index].toObject(),
							hasLiked: postsWithContent[index].likes.length === 1,
							user: posts[index].user.toObject(),
						}

						responseObject.posts.push(newObject)
					}
				})

				console.log('responseObject', responseObject)

				return responseObject
			} catch (err) {
				console.log('err', err)
				return sendErrorMessage(err)
			}
		},
	},
}

export default resolvers
