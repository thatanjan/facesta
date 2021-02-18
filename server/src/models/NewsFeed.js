import mongoose from 'mongoose'
import User from 'models/User'

const Schema = mongoose.Schema

const objectId = Schema.Types.ObjectId

const user = {
	type: objectId,
	ref: User,
	required: true,
}

const posts = { type: objectId }

const schema = {
	user,
	postUser: [user],
	posts,
}

const NewsFeedSchema = new Schema(schema, { versionKey: '1' })

const NewsFeedModel = mongoose.model('newsfeed', NewsFeedSchema)

export default NewsFeedModel
