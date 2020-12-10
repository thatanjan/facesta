import mongoose from 'mongoose'
import Post, { PostSchema } from 'models/Post'

import User from 'models/User'

const resolver = {
    Mutation: {
        createPost: async (_, { input: { text } }, { user: { id } }) => {
            const user = await User.findById(id)

            if (!user) {
                return Error('no user found')
            }

            const UserModel = mongoose.model(`${id}`, PostSchema)
            const newPost = new UserModel({ text })

            const post = await newPost.save()

            console.log(post)

            return {
                text: 'shit',
            }
        },
    },
}

export default resolver
