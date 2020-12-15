import createPostModel from 'models/Post'
import { sendMessage } from 'utils/error'

const resolver = {
    Mutation: {
        likePost: async (_, { input: { id: postId } }, { user: { id } }) => {
            const Post = createPostModel(id)

            const likesQuery = await Post.findById(postId, 'likes')
            const { likes } = likesQuery

            if (likes.includes(id)) {
                return sendMessage(false, 'you have already liked this post')
            }

            likes.push(id)

            likesQuery.save()

            return sendMessage(true, 'you have liked this post')
        },
    },
}

export default resolver
