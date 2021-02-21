import Profile from 'models/Profile'

const PERSONAL = 'personal'
const EXPERIENCE = 'experience'
const EDUCATION = 'education'
const SOCIAL = 'social'

const resolverFunction = field => {
	return async (_, { Input: { profileUserId } }) => {
		let query

		if (field === PERSONAL) {
			query = await Profile.findOne({ user: profileUserId }, field).populate(
				'user'
			)

			const data = query[`${field}`]

			data.name = query.user.name

			return data
		}

		query = await Profile.findOne({ user: profileUserId }, field)
		return query[`${field}`]
	}
}

const resolver = {
	Query: {
		getPersonalData: resolverFunction(PERSONAL),
	},
}

export default resolver
