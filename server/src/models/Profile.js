import mongoose from 'mongoose'

const Schema = mongoose.Schema

const objectId = Schema.Types.ObjectId

const data = {
    user: {
        type: objectId,
        required: true,
    },
    personal: {
        dateOfBirth: {
            type: Date,
        },
        website: {
            type: String,
        },
        status: {
            type: String,
        },
        location: {
            type: String,
        },

        skills: {
            type: [String],
        },
        bio: {
            type: String,
        },
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
        },
    ],

    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            field_of_study: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
        },
    ],

    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
}

const Profile_Schema = new Schema(data, { versionKey: '1' })

const Profile_model = mongoose.model('profile', Profile_Schema)

export default Profile_model
