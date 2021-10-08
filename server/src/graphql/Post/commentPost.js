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
		removeCommentPost: async (
			_,
			{ Input: { postID, commentID } },
			{ user: { id } }
		) => {
			try {
				const post = await Post.findOne(
					{ _id: postID },
					{
						comments: {
							$elemMatch: {
								_id: commentID,
								user: id,
							},
						},
					}
				)

				if (
					!post ||
					!post.comments.length ||
					post.comments[0].user.toString() !== id
				)
					return sendErrorMessage()

				const update = await Post.updateOne(
					{ _id: postID },
					{
						$pull: {
							comments: {
								_id: commentID,
								user: id,
							},
						},
						$inc: {
							totalComments: -1,
						},
					}
				)

				if (!update || !update.nModified) return sendErrorMessage()

				return sendMessage(REMOVE_COMMENT_MESSAGE)
			} catch (e) {
				return sendErrorMessage(e)
			}
		},
		editComment: async (
			_,
			{ Input: { commentID, postID, text } },
			{ user: { id } }
		) => {
			const post = await Post.findOne(
				{ _id: postID },
				{
					comments: {
						$elemMatch: {
							_id: commentID,
							user: id,
						},
					},
				}
			)

			if (
				!post ||
				!post.comments.length ||
				post.comments[0].user.toString() !== id
			)
				return sendErrorMessage()

			const update = await Post.updateOne(
				{ _id: postID, 'comments._id': commentID },
				{
					$set: {
						'comments.$.text': text,
					},
				}
			)

			if (!update || !update.nModified) return sendErrorMessage()

			return sendMessage('Comment updated successfully')
		},
	},
}

export default resolver
