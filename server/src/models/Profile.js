import { Schema, model } from 'mongoose'

const objectId = Schema.Types.ObjectId

const data = {
	user: {
		type: objectId,
		default: null,
		ref: 'users',
	},
	name: {
		type: String,
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
	profilePicture: {
		type: String,
		default: '',
	},
	date: {
		type: Date,
		default: Date.now,
	},
}

const ProfileSchema = new Schema(data, { versionKey: '2' })

const ProfileModel = model('profile', ProfileSchema)

export default ProfileModel
