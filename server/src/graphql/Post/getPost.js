import createPostModel from 'models/Post'
import { sendMessage, throwError } from 'utils/error'

const resolver = {
    Query: {
        getSinglePost: async (
            _,
            { input: { postId, userId } },
            { user: { id } }
        ) => {
            const Post = createPostModel(userId || id)

            const singlePost = await Post.findById(postId, 'text')

            if (!singlePost) {
                return throwError('no post found')
            }

            return singlePost
        },
        getAllPost: async (_, { input: { start } }, { user: { id } }) => {
            const Post = createPostModel(id)

            const allPost = {}

            allPost.posts = await Post.find({})
                .sort({ _id: '-1' })
                .skip(start)
                .limit(3)

            if (allPost.posts === []) {
                return sendMessage(true, 'you have no post')
            }

            return allPost
        },
    },
}

export default resolver
