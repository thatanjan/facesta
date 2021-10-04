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

				console.log(JSON.stringify(newsFeedPosts, null, 4))
				const { posts } = newsFeedPosts

				posts.reverse()

				// const post = PostModel.findById(postID.toString(), {
				// 	likes: { $elemMatch: { $eq: id } },
				// 	...projection,
				// })

				return posts
			} catch (err) {
				return sendErrorMessage(err)
			}
		},
	},
}

export default resolvers
