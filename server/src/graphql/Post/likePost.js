import createPostModel from 'models/Post'
import { sendMessage } from 'utils/error'

const queryPostLikes = async (model, id) => await model.findById(id, 'likes')

const hasLiked = (array, id) => array.includes(id)

const operationCheck = (operation) => {
    if (operation === 'like') {
        return true
    }

    if (operation === 'removeLike') {
        return false
    }
}

const modifyLikes = (operation, array, id) => {
    if (operationCheck(operation)) {
        array.push(id)
        console.log(array)
    }

    if (!operationCheck(operation)) {
        console.table([operation, array, id])
        array.pull(id)
    }
}

const responseMessage = (operation) => {
    if (operationCheck(operation)) {
        return sendMessage(true, 'you have liked this post')
    }

    if (!operationCheck(operation)) {
        return sendMessage(true, 'you have remove like from the post')
    }
}

const mainFunction = (operation) => {
    return async (_, { input: { id: postId } }, { user: { id } }) => {
        const Post = createPostModel(id)

        const likesQuery = await queryPostLikes(Post, postId)

        const { likes } = likesQuery

        if (operation === 'like' && hasLiked(likes, id)) {
            return sendMessage(false, 'you have already liked this post')
        }

        if (operation === 'removeLike' && !hasLiked(likes, id)) {
            return sendMessage(false, 'you have not liked this post.')
        }

        modifyLikes(operation, likes, id)

        likesQuery.save()

        return responseMessage(operation)
    }
}

const resolver = {
    Mutation: {
        likePost: mainFunction('like'),
        removeLike: mainFunction('removeLike'),
    },
}

export default resolver
