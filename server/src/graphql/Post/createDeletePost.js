import mongoose from 'mongoose'
import createPostModel from 'models/Post'
import { sendMessage } from 'utils/error'

import User from 'models/User'

const resolver = {
    Mutation: {
        createPost: async (_, { input: { text } }, { user: { id } }) => {
            const Post = createPostModel(id)

            const newPost = new Post({ text })

            const post = await newPost.save()

            return post
        },
        deletePost: async (_, { input: { id: postId } }, { user: { id } }) => {
            const Post = createPostModel(id)

            const post = await Post.findById(postId)

            if (!post) {
                return sendMessage(false, 'no post found')
            }

            const postDeleted = await Post.findByIdAndRemove(postId, {
                useFindAndModify: false,
            })

            if (postDeleted) {
                return sendMessage(true, 'post has been deleted')
            }

            return sendMessage(false, 'something went wrong')
        },
    },
}

export default resolver
