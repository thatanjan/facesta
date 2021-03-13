import createPostModel from 'models/Post'
import Follow from 'models/Follow'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'
import { FOLLOWERS } from 'variables/global'
import NewsFeedModel from 'models/NewsFeed'
import uploadImage from 'utils/uploadToCloudinary'
import imageConfig from 'variables/cloudinaryVariables'

export const postPath = id => `posts/${id}/`

const resolver = {
	Mutation: {
		createPost: async (
			_,
			{ Input: { headline, markdown, text, image } },
			{ user: { id } }
		) => {
			try {
				const Post = createPostModel(id)

				const imagePublicID = await uploadImage(image, {
					folder: postPath(),
					...imageConfig,
				})

				if (imagePublicID.message) {
					return sendErrorMessage(imagePublicID)
				}

				let postObject

				if (imagePublicID && typeof imagePublicID === 'string') {
					postObject = { text, image: imagePublicID, headline, markdown }
				}

				const newPost = new Post(postObject)

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
			} catch (error) {
				sendErrorMessage(error)
			}
		},
		deletePost: async (_, { Input: { postID } }, { user: { id } }) => {
			const followersQuery = await Follow.findOne({ user: id }, FOLLOWERS)

			const { followers } = followersQuery

			followers.forEach(async follower => {
				const newsfeed = await NewsFeedModel.findOne({
					user: { follower: 'posts' },
				})
				console.log(newsfeed)
			})

			return sendErrorMessage('error')
		},
	},
}

export default resolver
