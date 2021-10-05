import Post from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'

const ADD_COMMENT_MESSAGE = 'you have commented on this post'
const REMOVE_COMMENT_MESSAGE = 'you have removed comment from this post'

const resolver = {
	Mutation: {
		commentPost: async (_, { Input: { postID, text } }, { user: { id } }) => {
			try {
				const updateObject = {
					$push: {
						comments: {
							user: id,
							text,
						},
					},
					$inc: { totalComments: 1 },
				}
				const update = await Post.updateOne({ _id: postID }, updateObject)

				if (!update || !update.nModified) return sendErrorMessage()

				return sendMessage(ADD_COMMENT_MESSAGE)
			} catch (e) {
				return sendErrorMessage(e)
			}
		},
	},
}

export default resolver
