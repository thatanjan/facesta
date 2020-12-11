import mongoose from 'mongoose'

const Schema = mongoose.Schema

const objectId = Schema.Types.ObjectId

const data = {
    user: {
        type: objectId,
        default: null,
        ref: 'user',
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
    public: {
        type: Boolean,
        default: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}

const ProfileSchema = new Schema(data, { versionKey: '1' })

const ProfileModel = mongoose.model('profile', ProfileSchema)

export default ProfileModel
