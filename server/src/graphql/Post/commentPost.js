import createPostModel from 'models/Post'
import { sendMessage, throwError } from 'utils/error'

const ADD_COMMENT = 'addComment'
const REMOVE_COMMENT = 'removeComment'

const ADD_COMMENT_MESSAGE = 'you have commented on this post'
const REMOVE_COMMENT_MESSAGE = 'you remove comment from the post'

const findComment = ({ comments, commentId }) => comments.id(commentId)

const ownsComment = ({ userId, id, commentedUser }) =>
    commentedUser === userId || commentedUser === id

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

const mainResolver = (operation) => {
    return async (
        _,
        { input: { postId, text, commentId, userId } },
        { user: { id } }
    ) => {
        let returnMessage = ''

        const Post = createPostModel(id)

        const post = await findPost(Post, postId)

        if (!post) {
            return sendMessage(false, 'no post found')
        }

        const { comments } = post

        switch (operation) {
            case ADD_COMMENT:
                addComment(comments, { id, text })
                returnMessage = ADD_COMMENT_MESSAGE

                break

            case REMOVE_COMMENT:
                const comment = findComment({ comments, commentId })

                if (!comment) {
                    return sendMessage(false, 'no comment found')
                }

                const commentedUser = comment.user.toString()

                if (!ownsComment({ id, userId, commentedUser })) {
                    return throwError('not authorized')
                }

                comment.remove()

                returnMessage = REMOVE_COMMENT_MESSAGE
                break

            default:
                return false
        }

        post.save()

        return sendMessage(true, returnMessage)
    }
}

const resolver = {
    Mutation: {
        commentPost: mainResolver(ADD_COMMENT),
        removeCommentPost: mainResolver(REMOVE_COMMENT),
    },
}

export default resolver
