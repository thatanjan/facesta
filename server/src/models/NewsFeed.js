import { Schema, model } from 'mongoose'
import User from 'models/User'

const objectId = Schema.Types.ObjectId

const user = {
	type: objectId,
	ref: User,
}

const posts = {
	user: {
		type: objectId,
		required: true,
		ref: User,
	},
	post: {
		type: objectId,
		required: true,
	},
	totalPosts: { type: Number, default: 0 },
}

const schema = {
	user,
	posts: [posts],
}

const NewsFeedSchema = new Schema(schema)

const NewsFeedModel = model('newsfeed', NewsFeedSchema)

export default NewsFeedModel
