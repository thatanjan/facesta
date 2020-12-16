import createPostModel from 'models/Post'
import { sendMessage } from 'utils/error'

const ADD_COMMENT = 'addComment'
const REMOVE_COMMENT = 'removeComment'

const ADD_COMMENT_MESSAGE = 'you have commented on this post'
const REMOVE_COMMENT_MESSAGE = 'you remove comment from the post'

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

const removeComment = ({ comments, commentId }) =>
    comments.id(commentId).remove()

const mainResolver = (operation) => {
    return async (
        _,
        { input: { id: postId, text, commentId } },
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
                removeComment({ comments, commentId })
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
