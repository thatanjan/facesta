import createPostModel from 'models/Post'
import Follow from 'models/Follow'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'
import { FOLLOWERS } from 'variables/global'
import NewsFeedModel from 'models/NewsFeed'
import uploadImage from 'utils/uploadToCloudinary'
import deleteImage from 'utils/deleteImageFromCloudinary'
import imageConfig from 'variables/cloudinaryVariables'

export const postPath = id => `confession/post/${id}/`

const resolver = {
	Mutation: {
		createPost: async (
			_,
			{ Input: { title, markdown, content, image } },
			{ user: { id } }
		) => {
			try {
				const Post = createPostModel(id)

				const imagePublicID = await uploadImage(image, {
					folder: postPath(id),
					...imageConfig,
				})

				if (imagePublicID.message) {
					return sendErrorMessage(imagePublicID)
				}

				let postObject

				if (imagePublicID && typeof imagePublicID === 'string') {
					postObject = { content, image: imagePublicID, title, markdown }
				}

				const newPost = new Post(postObject)

				await newPost.save()

				const { followers } = await Follow.findOne({ user: id }, FOLLOWERS)

				followers.push(id)

				const promises = []
				for (let i = 0; i < followers.length; i++) {
					const follower = followers[i]
					// eslint-disable-next-line

					const pushedObject = { user: id, post: newPost._id }

					promises.push(
						NewsFeedModel.updateOne(
							{ user: follower },
							{ $push: { posts: pushedObject }, $inc: { totalPosts: 1 } }
						)
					)
				}
				await Promise.all(promises)

				return sendMessage('post is published')
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
		deletePost: async (_, { postID }, { user: { id } }) => {
			const Post = createPostModel(id)

			const actualPost = await Post.findByIdAndRemove(postID, {
				projection: 'image',
			})

			if (!actualPost) {
				return sendErrorMessage('no post found')
			}

			const imageDeleted = await deleteImage(actualPost.image)

			if (!imageDeleted || imageDeleted.result !== 'ok') {
				return sendErrorMessage('something went wrong')
			}

			const followersQuery = await Follow.findOne({ user: id }, FOLLOWERS)

			const { followers } = followersQuery

			const query = await NewsFeedModel.updateMany(
				{},
				{
					$pull: {
						posts: { post: postID },
					},
					$inc: { totalPosts: -1 },
				}
			)

			if (
				query.nModified > 0 ||
				(followers.length === 0 && query.nModified === 0)
			) {
				return sendMessage('post deleted')
			}

			return sendErrorMessage('error')
		},
	},
}

export default resolver
