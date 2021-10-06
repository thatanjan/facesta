import Post from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'

const resolvers = {
	Mutation: {
		editPost: async (_, { Input }) => {
			try {
				const post = await Post.findById(Input.postID, 'text title markdown')

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
