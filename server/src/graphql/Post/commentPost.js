import createPostModel from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'

const ADD_COMMENT = 'addComment'
const REMOVE_COMMENT = 'removeComment'

const ADD_COMMENT_MESSAGE = 'you have commented on this post'
const REMOVE_COMMENT_MESSAGE = 'you remove comment from the post'

const findComment = ({ comments, commentID }) => comments.id(commentID)

const ownsComment = ({ postUserId, id, commentedUser }) =>
	commentedUser === postUserId || commentedUser === id

const findPost = async (model, id) => {
	const post = await model.findById(id, 'comments')
	return post
}

const addComment = (comments, { id, text }) => {
	const commentObject = {
		user: id,
		text,
	}

	comments.push(commentObject)
}

const mainResolver = operation => {
	return async (
		_,
		{ Input: { postID, text, commentID, postOwnerID } },
		{ user: { id } }
	) => {
		try {
			let returnMessage = ''

			const Post = createPostModel(id)

			const post = await findPost(Post, postID)

			if (!post) {
				return sendErrorMessage('no post found')
			}

			const { comments } = post

			switch (operation) {
				case ADD_COMMENT:
					addComment(comments, { id, text })
					returnMessage = ADD_COMMENT_MESSAGE

					break

				case REMOVE_COMMENT:
					const comment = findComment({ comments, commentID })

					if (!comment) {
						return sendErrorMessage('no comment found')
					}

					const commentedUser = comment.user.toString()

					if (!ownsComment({ id, postUserId: postOwnerID, commentedUser })) {
						return sendErrorMessage('not authorized')
					}

					comment.remove()

					returnMessage = REMOVE_COMMENT_MESSAGE
					break

				default:
					return false
			}

			post.save()

			return sendMessage(returnMessage)
		} catch (error) {
			return sendErrorMessage(error)
		}
	}
}

const resolver = {
	Mutation: {
		commentPost: mainResolver(ADD_COMMENT),
		removeCommentPost: mainResolver(REMOVE_COMMENT),
	},
}

export default resolver
