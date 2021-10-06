import Post from 'models/Post'
import Follow from 'models/Follow'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'
import { FOLLOWERS } from 'variables/global'
import NewsFeedModel from 'models/NewsFeed'
import uploadImage from 'utils/uploadToCloudinary'
import imageConfig from 'variables/cloudinaryVariables'

export const postPath = (user, id) => `confession/post/${user}/${id}/`

const resolver = {
	Mutation: {
		createPost: async (
			_,
			{ Input: { title, markdown, text, images } },
			{ user: { id } }
		) => {
			try {
				const postObject = { text, images: [], title, markdown, user: id }

				const newPost = new Post(postObject)

				const uploadImagePromises = images.map(image =>
					uploadImage(image, {
						folder: postPath(id, newPost._id),
						imageConfig,
					})
				)

				const publicIDs = await Promise.all(uploadImagePromises)

				console.log(publicIDs)
				newPost.images = publicIDs

				await newPost.save()

				const { followers } = await Follow.findOne({ user: id }, FOLLOWERS)

				followers.push(id)

				await NewsFeedModel.updateMany(
					{ user: { $in: followers } },
					{ $push: { posts: newPost._id }, $inc: { totalPosts: 1 } }
				)

				return sendMessage('post is published')
			} catch (error) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
