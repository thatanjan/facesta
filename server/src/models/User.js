import mongoose from 'mongoose'

const Schema = mongoose.Schema

const objectId = mongoose.Schema.Types.ObjectId

const User_Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
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
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.model('user', User_Schema)

export default User
