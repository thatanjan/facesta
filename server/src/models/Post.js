import { Schema, createConnection } from 'mongoose'

import User from 'models/User'

const objectId = Schema.Types.ObjectId

const user = {
	type: objectId,
	ref: User,
}

const CommentedUserSchema = new Schema({
	user,
	text: { type: String, required: true },
	date: { type: Date, default: Date.now() },
})

const schema = {
	text: { type: String, required: true },
	likes: [user],
	totalLikes: { type: Number, default: 0 },
	totalComments: { type: Number, default: 0 },
	comments: [CommentedUserSchema],
	headline: { type: String, required: true },
	markdown: { type: Boolean, required: true },
	public: {
		type: Boolean,
		default: true,
	},
	image: { type: String },
	date: { type: Date, default: Date.now() },
}

export const PostSchema = new Schema(schema)

const PostModel = modelName => {
	const PostConnection = createConnection(process.env.POSTS_DB_URI)
	const Post = PostConnection.model(modelName, PostSchema)

	return Post
}

export default PostModel
