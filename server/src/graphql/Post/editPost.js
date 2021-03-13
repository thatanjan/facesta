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

				if (image) {
					const imagePublicID = await uploadImage(image, {
						folder: postPath(),
						...imageConfig,
					})

					post.imageURL = imagePublicID

					const oldImageID = post.image
					if (oldImageID) {
						await deleteImage(oldImageID)
					}
				}

				if (image === '') {
					post.imageURL = ''
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
