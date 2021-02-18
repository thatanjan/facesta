import mongoose from 'mongoose'
import createPostModel from 'models/Post'
import Follow from 'models/Follow'
import { sendMessage } from 'utils/error'
import { getUsers } from 'graphql/Follow/getFollowersAndFollowings'
import { FOLLOWERS } from 'variables/global'

const resolver = {
	Mutation: {
		createPost: async (_, { Input: { text } }, { user: { id } }) => {
			const Post = createPostModel(id)

			const newPost = new Post({ text })

			const post = await newPost.save()

			const { followers } = await Follow.findOne({ user: id }, FOLLOWERS)

			return post
		},
		deletePost: async (_, { Input: { id: postId } }, { user: { id } }) => {
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
