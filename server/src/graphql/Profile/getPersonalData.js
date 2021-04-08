import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'

const resolverFunction = () => {
	return async (_, { user }, { user: { id } }) => {
		try {
			const query = await Profile.findOne(
				{ user: user || id },
				'personal name profilePicture'
			)

			if (!query) return sendErrorMessage('no profile found')

			return query
		} catch (error) {
			return sendErrorMessage(error)
		}
	}
}

const resolver = {
	Query: {
		getPersonalData: resolverFunction(),
	},
}

export default resolver
