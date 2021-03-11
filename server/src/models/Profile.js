import { Schema, model } from 'mongoose'

const objectId = Schema.Types.ObjectId

const images = {
	profile: {
		type: String,
	},
	cover: { type: String },
}

const ExperienceSchema = new Schema({
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
	},
	to: {
		type: Date,
	},
})

const EducationSchema = new Schema({
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
	},
	to: {
		type: Date,
	},
})

const SocialSchema = {
	youtube: {
		type: String,
		default: '',
	},
	twitter: {
		type: String,
		default: '',
	},
	facebook: {
		type: String,
		default: '',
	},
	linkedin: {
		type: String,
		default: '',
	},
	instagram: {
		type: String,
		default: '',
	},
}

const data = {
	user: {
		type: objectId,
		default: null,
		ref: 'users',
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
	experience: [ExperienceSchema],
	education: [EducationSchema],

	social: SocialSchema,
	public: {
		type: Boolean,
		default: true,
	},
	images,
	date: {
		type: Date,
		default: Date.now,
	},
}

const ProfileSchema = new Schema(data, { versionKey: '2' })

const ProfileModel = model('profile', ProfileSchema)

export default ProfileModel
