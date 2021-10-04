import { Schema, model } from 'mongoose'
import User from 'models/User'
import Post from 'models/Post'

const objectId = Schema.Types.ObjectId

const user = {
	type: objectId,
	ref: User,
	required: true,
}

const post = {
	type: objectId,
	required: true,
	ref: Post,
}

const schema = {
	user,
	posts: [post],
	totalPosts: { type: Number, default: 0 },
}

const NewsFeedSchema = new Schema(schema)

const NewsFeedModel = model('newsfeed', NewsFeedSchema)

export default NewsFeedModel
