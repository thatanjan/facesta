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

				const newsFeedPosts = await NewsFeedModel.findOne({
					user: id,
				})
					.slice('posts', [-Math.abs(newSkip), returnNumber])
					.populate({
						path: 'posts',
						populate: {
							path: 'user',
							select: 'profile',
							populate: {
								path: 'profile',
								select: 'profilePicture name',
							},
						},
					})

				const { posts } = newsFeedPosts

				posts.reverse()

				const postsUsers = posts.map(({ user }) => user)

				const resolvePost = async () => {
					const postPromises = posts.map(
						({ post: postID, user: { _id: userID } }) => {
							const PostModel = createPostModel(userID.toString())

							const post = PostModel.findById(postID.toString(), {
								likes: { $elemMatch: { $eq: id } },
								...projection,
							})

							return post
						}
					)

					const resolved = await Promise.all(postPromises)

					return resolved
				}

				const resolvedPosts = await resolvePost()

				const response = { posts: [] }

				response.posts = postsUsers.map((user, index) => {
					const newObject = {
						...resolvedPosts[index].toObject(),
						user: user.toObject(),
						hasLiked: resolvedPosts[index].length === 0,
					}

					return newObject
				})

				return response
			} catch (err) {
				return sendErrorMessage(err)
			}
		},
	},
}

export default resolvers
