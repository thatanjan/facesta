import { Schema, model } from 'mongoose'

import { stringRequired } from 'variables/global'
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
	title: stringRequired,
	text: stringRequired,
	images: [stringRequired],
	likes: [user],
	totalLikes: {
		type: Number,
		default: 0,
	},
	comments: [CommentedUserSchema],
	totalComments: {
		type: Number,
		default: 0,
	},
	user: { ...user, required: true },
	date: {
		type: Date,
		default: Date.now(),
	},
	markdown: { type: Boolean, default: false },
}

export const PostSchema = new Schema(schema)

const PostModel = model('Post', PostSchema)

export default PostModel
