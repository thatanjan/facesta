import mongoose from 'mongoose'

const Schema = mongoose.Schema

const objectId = Schema.Types.ObjectId

const user = {
	type: objectId,
	ref: 'users',
	required: true,
}

const schema = {
	user,
	followers: [user],
	followees: [user],
}

export const FollowSchema = new Schema(schema, { versionKey: '1' })

const Follow = mongoose.model('follow', FollowSchema)

export default Follow
