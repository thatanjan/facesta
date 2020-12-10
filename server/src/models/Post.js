import mongoose from 'mongoose'

import User from 'models/User'

const Schema = mongoose.Schema

const objectId = Schema.Types.ObjectId

const schema = {
    text: { type: String, required: true },
    likes: [
        {
            user: {
                type: objectId,
                ref: User,
            },
        },
    ],
    comments: [
        {
            user: {
                type: objectId,
                ref: User,
            },
            text: { type: String, required: true },
            name: { type: String },
            date: { type: Date, default: Date.now() },
        },
    ],
    date: { type: Date, default: Date.now() },
}

export const PostSchema = new Schema(schema, { versionKey: '1' })

const PostModel = (modelName) => {
    const connection = mongoose.createConnection(process.env.POSTS_DB_URI)

    const Post = connection.model(modelName, PostSchema)

    return Post
}

export default PostModel
