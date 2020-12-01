import mongoose from 'mongoose'

const Schema = mongoose.Schema

// create schema

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    text: { type: String, required: true },
    name: { type: String },
    avatar: {
        type: String,
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
        },
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
            text: { type: String, required: true },
            name: { type: String },
            avatar: { type: String },
            date: { type: Date, default: Date.now() },
        },
    ],
    date: { type: Date, default: Date.now() },
})

const Post = mongoose.model('posts', PostSchema)

export default Post
