import createPostModel from 'models/Post'
import Follow from 'models/Follow'
import { sendMessage } from 'utils/error'
import { FOLLOWERS } from 'variables/global'
import NewsFeedModel from 'models/NewsFeed'

const resolver = {
	Mutation: {
		createPost: async (_, { Input: { text } }, { user: { id } }) => {
			const Post = createPostModel(id)

			const newPost = new Post({ text })

			const post = await newPost.save()

			const { followers } = await Follow.findOne({ user: id }, FOLLOWERS)

			for (let i = 0; i < followers.length; i++) {
				const newsfeed = await NewsFeedModel.findOne(
					{ user: followers[i] },
					'posts'
				)
				newsfeed.posts.push({ postUser: id, postId: newPost._id })
				await newsfeed.save()
			}

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
