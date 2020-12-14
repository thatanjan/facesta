import createPostModel from 'models/Post'

import User from 'models/User'

const resolver = {
    Mutation: {
        createPost: async (_, { input: { text } }, { user: { id } }) => {
            const PostModel = createPostModel(id)

            const user = await User.findById(id)

            if (!user) {
                return Error('no user found')
            }

            const newPost = new PostModel({ user: id, text })

            const post = await newPost.save()

            return post
        },
    },
}

export default resolver
