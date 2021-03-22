import { model, Schema, ObjectId } from 'mongoose'
import User from 'models/User'

const user = {
	type: ObjectId,
	ref: User,
	required: true,
}

const schema = {
	user,
	followers: [user],
	followees: [user],
	totalFollowers: { type: Number, default: 0 },
	totalFollowees: { type: Number, default: 0 },
}

export const FollowSchema = new Schema(schema)

const Follow = model('follow', FollowSchema)

export default Follow
