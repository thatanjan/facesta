import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'

const PERSONAL = 'personal'
const EXPERIENCE = 'experience'
const EDUCATION = 'education'
const SOCIAL = 'social'

const resolverFunction = field => {
	return async (_, { Input: { profileOwnerID } }) => {
		try {
			let query

			if (field === PERSONAL) {
				query = await Profile.findOne({ user: profileOwnerID }, field).populate(
					'user'
				)

				const data = query[`${field}`]

				data.name = query.user.name

				return data
			}

			query = await Profile.findOne({ user: profileOwnerID }, field)
			return query[`${field}`]
		} catch (error) {
			return sendErrorMessage(error)
		}
	}
}

const resolver = {
	Query: {
		getPersonalData: resolverFunction(PERSONAL),
	},
}

export default resolver
