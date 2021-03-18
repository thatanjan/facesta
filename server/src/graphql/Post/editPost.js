import createPostModel from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'
import uploadImage from 'utils/uploadToCloudinary'
import deleteImage from 'utils/deleteImageFromCloudinary'
import imageConfig from 'variables/cloudinaryVariables'
import { postPath } from './createDeletePost'

const resolvers = {
	Mutation: {
		editPost: async (_, { Input }, { user: { id } }) => {
			try {
				const PostModel = createPostModel(id)

				const post = await PostModel.findById(Input.postID)

				const { image } = Input

				const oldImageID = post.image

				if (oldImageID) {
					await deleteImage(oldImageID)
				}

				if (image) {
					const imagePublicID = await uploadImage(image, {
						folder: postPath(id),
						...imageConfig,
					})

					if (!imagePublicID || typeof imagePublicID !== 'string')
						return sendErrorMessage('Could not update the profile')

					post.image = imagePublicID
				}

				if (image === '') {
					post.image = ''
				}

				const inputKeys = Object.keys(Input)

				inputKeys.forEach(item => {
					if (item !== 'image') {
						post[item] = Input[item]
					}
				})

				await post.save()

				return sendMessage('post updated')
			} catch (err) {
				return sendErrorMessage(err)
			}
		},
	},
}

export default resolvers
