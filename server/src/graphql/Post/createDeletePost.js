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
				const follower = followers[i]
				// eslint-disable-next-line
				const newsfeed = await NewsFeedModel.findOne({ user: follower }, 'posts')

				const pushedObject = { postUser: id, postId: newPost._id }

				if (!newsfeed) {
					const newNewsfeed = new NewsFeedModel()

					newNewsfeed.user = follower
					newNewsfeed.posts.push(pushedObject)

					Promise.all([newNewsfeed.save()])
				} else {
					newsfeed.posts.push(pushedObject)

					Promise.all([newsfeed.save()])
				}
			}

			return sendMessage('post is published')
		},
		deletePost: async (_, { Input: { id: postId } }, { user: { id } }) => {
			const Post = createPostModel(id)

			const post = await Post.findById(postId)

			if (!post) {
				return sendErrorMessage('no post found')
			}

			const postDeleted = await Post.findByIdAndRemove(postId, {
				useFindAndModify: false,
			})

			if (postDeleted) {
				return sendErrorMessage('post has been deleted')
			}

			return sendErrorMessage('something went wrong')
		},
	},
}

export default resolver
