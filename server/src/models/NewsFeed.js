import mongoose from 'mongoose'
import User from 'models/User'

const Schema = mongoose.Schema

const objectId = Schema.Types.ObjectId

const user = {
	type: objectId,
	ref: User,
}

const posts = {
	postUser: {
		type: objectId,
		required: true,
	},
	postId: {
		type: objectId,
		required: true,
	},
}

const schema = {
	user,
	posts: [posts],
}

const NewsFeedSchema = new Schema(schema, { versionKey: '1' })

const NewsFeedModel = mongoose.model('newsfeed', NewsFeedSchema)

export default NewsFeedModel
