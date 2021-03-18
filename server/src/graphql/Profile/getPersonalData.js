import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'

const PERSONAL = 'personal'

const resolverFunction = field => {
	return async (_, { user }, { user: { id } }) => {
		try {
			const query = await Profile.findOne({ user: user || id }, field).populate(
				'user'
			)

			if (!query) return sendErrorMessage('no profile found')

			const data = query[field]

			data.name = query.user.name

			return data
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
