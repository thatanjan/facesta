import mongoose from 'mongoose'
import User from 'models/User'

const Schema = mongoose.Schema

const objectId = Schema.Types.ObjectId

const user = {
	type: objectId,
	ref: User,
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
