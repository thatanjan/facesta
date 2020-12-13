import mongoose from 'mongoose'

const Schema = mongoose.Schema

const objectId = Schema.Types.ObjectId

const user = {
    type: objectId,
}

const schema = {
    user: {
        type: objectId,
        required: true,
    },
    follwers: [user],
    following: [user],
}

export const FollowSchema = new Schema(schema, { versionKey: '1' })

const Follow = mongoose.model('follow', FollowSchema)

export default Follow
