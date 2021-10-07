import Post from 'models/Post'
import Follow from 'models/Follow'
import NewsFeedModel from 'models/NewsFeed'

import sendMessage from 'utils/message'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Mutation: {
		deletePost: async (_, { postID }, { user: { id } }) => {
			try {
				const post = await Post.findById(postID, 'user')

				if (!post) return sendErrorMessage('Post not found')

				if (post.user.toString() !== id)
					return sendErrorMessage("You don't own this post")

				const { followers } = await Follow.findOne({ user: id }, 'followers')

				followers.push(id)

				await NewsFeedModel.updateMany(
					{ user: { $in: followers } },
					{
						$pull: {
							posts: postID,
						},
						$inc: {
							totalPosts: -1,
						},
					}
				)

				await Post.findByIdAndRemove(postID)

				return sendMessage('Post successfully deleted')
			} catch (err) {
				return sendErrorMessage(err)
			}
		},
	},
}

export default resolver
