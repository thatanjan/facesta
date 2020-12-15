import createPostModel from 'models/Post'
import { sendMessage } from 'utils/error'

const queryPostLikes = async (model, id) => await model.findById(id, 'likes')

const hasLiked = (array, id) => array.includes(id)

const resolver = {
    Mutation: {
        likePost: async (_, { input: { id: postId } }, { user: { id } }) => {
            const Post = createPostModel(id)

            const likesQuery = queryPostLikes(Post, postId)

            const { likes } = likesQuery

            if (likes.includes(id)) {
                // if (hasLiked(likes, id)) {
                return sendMessage(false, 'you have already liked this post')
            }

            likes.push(id)

            likesQuery.save()

            return sendMessage(true, 'you have liked this post')
        },
        unlikePost: async (_, { input: { id: postId } }, { user: { id } }) => {
            const Post = createPostModel(id)

            const likesQuery = queryPostLikes(Post, postId)

            const { likes } = likesQuery

            if (!hasLiked(likes, id)) {
                return sendMessage(false, 'you have not liked this post.')
            }

            likes.pull(id)

            likesQuery.save()

            return sendMessage(true, 'you have remove the like from the post')
        },
    },
}

export default resolver
