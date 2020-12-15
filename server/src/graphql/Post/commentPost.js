import createPostModel from 'models/Post'
import { sendMessage } from 'utils/error'

const ADD_COMMENT = 'addComment'

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
    return async (_, { input: { id: postId, text } }, { user: { id } }) => {
        const Post = createPostModel(id)

        const post = await findPost(Post, postId)

        if (!post) {
            return sendMessage(false, 'no post found')
        }

        const { comments } = post

        if (operation === ADD_COMMENT) {
            addComment(comments, { id, text })
        }

        post.save()

        return sendMessage(true, 'you have commented on this post')
    }
}

const resolver = {
    Mutation: {
        commentPost: mainResolver(ADD_COMMENT),
    },
}

export default resolver
