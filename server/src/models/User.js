import mongoose from 'mongoose'

const { Schema } = mongoose

const objectId = mongoose.Schema.Types.ObjectId

const schema = {
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	profile: {
		type: objectId,
		required: true,
		ref: 'profile',
	},
	posts: {
		type: objectId,
		ref: 'posts',
	},
	newsfeed: { type: objectId, ref: 'newsfeed', required: true },
	date: {
		type: Date,
		default: Date.now,
	},
}

const UserSchema = new Schema(schema, { versionKey: '1' })

const User = mongoose.model('user', UserSchema)

export default User
