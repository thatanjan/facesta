import createPostModel from 'models/Post'
import Follow from 'models/Follow'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'
import { FOLLOWERS } from 'variables/global'
import NewsFeedModel from 'models/NewsFeed'

const resolver = {
	Mutation: {
		createPost: async (_, { Input: { text } }, { user: { id } }) => {
			const Post = createPostModel(id)

			const newPost = new Post({ text })

			try {
				await newPost.save()
			} catch (error) {
				return sendErrorMessage(error)
			}

			const { followers } = await Follow.findOne({ user: id }, FOLLOWERS)

			for (let i = 0; i < followers.length; i++) {
				// eslint-disable-next-line
				const newsfeed = await NewsFeedModel.findOne(
					{ user: followers[i] },
					'posts'
				)

				newsfeed.posts.push({ postUser: id, postId: newPost._id })
				// eslint-disable-next-line
				await newsfeed.save()
			}

			return sendMessage('post is published')
		},
		deletePost: async (_, { Input: { id: postId } }, { user: { id } }) => {
			const Post = createPostModel(id)

			const post = await Post.findById(postId)

			if (!post) {
				return sendErrorMessage(false, 'no post found')
			}

			const postDeleted = await Post.findByIdAndRemove(postId, {
				useFindAndModify: false,
			})

			if (postDeleted) {
				return sendErrorMessage(true, 'post has been deleted')
			}

			return sendErrorMessage(false, 'something went wrong')
		},
	},
}

export default resolver
