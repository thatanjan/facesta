import NewsFeedModel from 'models/NewsFeed'
import Post from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'
import convertToObjectId from 'utils/convertToObjectID'
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
					.slice('posts', [newSkip, returnNumber])
					.populate({
						path: 'posts',
						select: '-comments -likes',
						populate: {
							path: 'user',
							select: 'profile',
							populate: {
								path: 'profile',
								select: 'profilePicture name -_id',
							},
						},
					})

				const { posts } = newsFeedPosts

				posts.reverse()

				const postIDs = posts.map(post => convertToObjectId(post._id))

				let hasLiked = await Post.find(
					{
						$and: [
							{
								_id: { $in: postIDs },
								likes: { $elemMatch: { $eq: id } },
							},
						],
					},
					'_id'
				)

				hasLiked = new Set(hasLiked.map(post => post._id.toString()))

				const response = posts.map(post => {
					const newPost = { ...post.toObject(), hasLiked: false }

					if (hasLiked.has(newPost._id.toString())) newPost.hasLiked = true
					return newPost
				})

				return { posts: response }
			} catch (err) {
				return sendErrorMessage(err)
			}
		},
	},
}

export default resolvers
