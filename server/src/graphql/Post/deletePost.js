import Post from 'models/Post'
import Follow from 'models/Follow'
import NewsFeedModel from 'models/NewsFeed'

import sendMessage from 'utils/message'
import sendErrorMessage from 'utils/errorMessage'
import deleteResourcesFromCloudinary from 'utils/deleteResourcesFromCloudinary'
import deleteDirectoryFromCloudinary from 'utils/deleteDirectoryFromCloudinary'

const DELETED = 'deleted'

const resolver = {
	Mutation: {
		deletePost: async (_, { postID }, { user: { id } }) => {
			try {
				const post = await Post.findById(postID, 'user images')

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

				const prefix = `confession/post/${id}/${postID}`

				const deleteImages = await deleteResourcesFromCloudinary({ prefix })

				let hasImagesDeleted = true
				const { images } = post

				for (let i = 0; i < images.length; i++) {
					const image = images[i].toString()

					if (deleteImages[DELETED][image] !== DELETED) {
						hasImagesDeleted = false
						break
					}
				}

				if (!hasImagesDeleted) return sendErrorMessage('Deleting images failed')

				const deleteDirectory = await deleteDirectoryFromCloudinary(prefix)

				if (!deleteDirectory.deleted.length) return sendErrorMessage()

				await Post.findByIdAndRemove(postID)

				return sendMessage('Post successfully deleted')
			} catch (err) {
				return sendErrorMessage(err)
			}
		},
	},
}

export default resolver
