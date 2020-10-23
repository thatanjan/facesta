import mongoose, { SchemaDefinition } from 'mongoose'

const Schema = mongoose.Schema

// interface Profile_Schema_interface {
//     user: object
//     handle: object
//     company: object
//     website: object
//     location: object
//     status: object
//     skills: object
//     bio: object
//     github_user_name: object
//     experience: object[]
//     education: object
//     social: object
//     date: object
// }

const data: SchemaDefinition = {
    user: {
        type: String,
    },
    handle: {
        type: String,
        required: true,
        max: 40,
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    bio: {
        type: String,
    },
    github_user_name: {
        type: String,
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
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: String,
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
            current: {
                type: Boolean,
                default: false,
            },
            description: String,
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

const Profile_Schema = new Schema(data)

const Profile_model = mongoose.model('profile', Profile_Schema)

export default Profile_model
