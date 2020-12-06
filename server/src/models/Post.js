import mongoose from 'mongoose'

const Schema = mongoose.Schema

const objectId = Schema.Types.ObjectId

const schema = {
    user: {
        type: objectId,
        ref: 'users',
    },
    text: { type: String, required: true },
    likes: [
        {
            user: {
                type: objectId,
                ref: 'users',
            },
        },
    ],
    comments: [
        {
            user: {
                type: objectId,
                ref: 'users',
            },
            text: { type: String, required: true },
            name: { type: String },
            date: { type: Date, default: Date.now() },
        },
    ],
    date: { type: Date, default: Date.now() },
}

const PostSchema = new Schema(schema, { versionKey: '1' })

const Post = mongoose.model('posts', PostSchema)

export default Post
