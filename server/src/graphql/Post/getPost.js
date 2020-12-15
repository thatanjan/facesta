import createPostModel from 'models/Post'
import { sendMessage } from 'utils/error'

const resolver = {
    Query: {
        getSinglePost: async () => {},
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
